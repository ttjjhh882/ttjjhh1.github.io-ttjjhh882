const requestPermissionBtn = document.getElementById('requestPermission');
        
        // Function to handle motion detection
        function startMotionDetection() {
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', function(event) {
                    var acceleration = event.accelerationIncludingGravity;

                    var x = acceleration.x ? acceleration.x.toFixed(2) : 0;
                    var y = acceleration.y ? acceleration.y.toFixed(2) : 0;
                    var z = acceleration.z ? acceleration.z.toFixed(2) : 0;

                    document.querySelector('.status').textContent = 'Motion detected!';
                    document.getElementById('coordinates').textContent = 
                        'X: ' + x + ' m/s², Y: ' + y + ' m/s², Z: ' + z + ' m/s²';
                });
            } else {
                document.querySelector('.status').textContent = 'Device motion not supported.';
            }
        }

        // Request permission for iOS devices
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            requestPermissionBtn.style.display = 'block'; // Show the button if permission is needed

            requestPermissionBtn.addEventListener('click', function() {
                DeviceMotionEvent.requestPermission().then(response => {
                    if (response === 'granted') {
                        document.querySelector('.status').textContent = 'Permission granted!';
                        startMotionDetection();
                    } else {
                        document.querySelector('.status').textContent = 'Permission denied!';
                    }
                }).catch(console.error);
            });
        } else {
            // If permission request is not needed, start detecting motion right away
            startMotionDetection();
        }