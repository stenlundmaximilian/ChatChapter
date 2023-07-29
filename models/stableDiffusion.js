async function stableDiffusionData(API_KEY){
    try {
        // Your API request code
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            // ... your JSON payload ...
            "key": API_KEY,
            "prompt": "Two pirates with a hobby of chess and horses",
            "negative_prompt": null,
            "width": "1024",
            "height": "512",
            "samples": "1",
            "num_inference_steps": "20",
            "seed": null,
            "guidance_scale": 7.5,
            "safety_checker": "yes",
            "multi_lingual": "no",
            "panorama": "no",
            "self_attention": "no",
            "upscale": "no",
            "embeddings_model": null,
            "webhook": null,
            "track_id": null
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        const response = await fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions);
        const result = await response.json();
        if (result.status === 'success' && result.output && result.output.length > 0) {
            // Extract the generated image URL from the response
            console.log(result.output[0])
            return imageUrl = result.output[0];
        }
        else{
            console.error(result.message)
        }
    }catch(error){
        // Handle any errors that might occur during the API request
        console.error('Error:', error);
        res.render('error', { message: 'An error occurred during the image generation process.' });
    }
}

module.exports = stableDiffusionData