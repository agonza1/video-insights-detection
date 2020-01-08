(() => {
    const { host } = window.location;

    document.addEventListener('DOMContentLoaded', () => {
        // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
        const player = new Plyr('#player');
        let frame;

        document.getElementById('getInsightsBtn').onclick = () => {
            // capture frame from video to canvas
            frame = captureVideoFrame('streamed-video', 'png');
            // Show the image
            let img = document.getElementById('my-screenshot');
            img.setAttribute('src', frame.dataUri);
            // Upload and analyze with Google Cloud Vision
            upload();
        };

        function upload() {
            let request = {
                "requests":[
                    {
                        "image":{ "content": frame.dataUriBase64 },
                        "features":[
                            {
                                "type": "WEB_DETECTION",
                                "maxResults":10
                            }
                        ],
                        // "imageContext": {
                            // "webDetectionParams": {
                            //     "includeGeoResults": true
                            // },
                            // "productSearchParams": {
                            //       "productCategories": [
                            //           'apparel'
                            //       ]
                            // }
                        // }
                    }
                ]
            };

            $.ajax({
                method: 'POST',
                url: 'https://vision.googleapis.com/v1/images:annotate?key=KEY',
                contentType: 'application/json',
                data: JSON.stringify(request),
                processData: false,
                success: function(data){
                    output = data;
                    console.log(data);
                    let websData = data.responses[0];
                    // console.log('joy: ' + faceData.joyLikelihood);
                    // console.log('sorrow: ' + faceData.sorrowLikelihood);
                    // console.log('anger: ' + faceData.angerLikelihood);
                    // console.log('surprise: ' + faceData.surpriseLikelihood);
                },
                error: function (data, textStatus, errorThrown) {
                    console.log('error: ' + JSON.stringify(data));
                    console.log(textStatus);
                }
            })
        }

        // Expose
        window.player = player;

        // Bind event listener
        function on(selector, type, callback) {
            document.querySelector(selector).addEventListener(type, callback, false);
        }

        // Play
        on('.js-play', 'click', () => {
            player.play();
        });

        // Pause
        on('.js-pause', 'click', () => {
            player.pause();
        });

        // Stop
        on('.js-stop', 'click', () => {
            player.stop();
        });

        // Rewind
        on('.js-rewind', 'click', () => {
            player.rewind();
        });

        // Forward
        on('.js-forward', 'click', () => {
            player.forward();
        });
    });
})();

const sources = {
    video: {
        type: 'video',
        title: 'View From A Blue Moon',
        sources: [
            {
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
                type: 'video/mp4',
                size: 576,
            },
            {
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
                type: 'video/mp4',
                size: 720,
            },
            {
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
                type: 'video/mp4',
                size: 1080,
            },
            {
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
                type: 'video/mp4',
                size: 1440,
            },
        ],
        poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
        tracks: [
            {
                kind: 'captions',
                label: 'English',
                srclang: 'en',
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
                default: true,
            },
            {
                kind: 'captions',
                label: 'French',
                srclang: 'fr',
                src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
            },
        ],
    },
};

