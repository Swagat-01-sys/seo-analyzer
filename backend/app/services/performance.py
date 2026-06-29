import os
import json
import subprocess


class PerformanceAnalyzer:

    @staticmethod
    def analyze(response, url):

        headers = response.headers

        try:
            response_time = round(
                response.elapsed.total_seconds(),
                3
            )
        except Exception:
            response_time = None

        page_size = round(
            len(response.content) / 1024,
            2
        )

        server = headers.get("Server", "Unknown")

        content_type = headers.get(
            "Content-Type",
            "Unknown"
        )

        compression = headers.get(
            "Content-Encoding",
            "None"
        )

        cache_control = headers.get(
            "Cache-Control",
            "Missing"
        )

        security_headers = {

            "Strict-Transport-Security":
                "Strict-Transport-Security" in headers,

            "Content-Security-Policy":
                "Content-Security-Policy" in headers,

            "X-Frame-Options":
                "X-Frame-Options" in headers,

            "X-Content-Type-Options":
                "X-Content-Type-Options" in headers
        }

        # --------------------------
        # Lighthouse
        # --------------------------

        lighthouse = {}

        try:
            
            
            runner = os.path.abspath("lighthouse_runner.js")

            
            process = subprocess.run(
            [
            "node",
            runner,
            url
            ],
            capture_output=True,
            text=True,
            timeout=15
            )
            
        
            if process.returncode == 0:

                lines = process.stdout.splitlines()

                for line in reversed(lines):
                    line = line.strip()

                    if line.startswith("{") and line.endswith("}"):
                        lighthouse = json.loads(line)
                        break

            else:

                print("Lighthouse exited with non-zero status.")

        except subprocess.TimeoutExpired as e:

            print("Lighthouse timed out.")
            print (e)

        except Exception as e:
            import traceback
            traceback.print_exc()

        return {

            "response_time_seconds": response_time,

            "page_size_kb": page_size,

            "server": server,

            "content_type": content_type,

            "compression": compression,

            "cache_control": cache_control,

            "security_headers": security_headers,

            "lighthouse": lighthouse

        }