
async function fetchData(API_KEY,character1,character2){
    const response = await fetch("https://api.openai.com/v1/chat/completions",{
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            temperature: 0.6,
            messages: [
                {"role":"system", "content":"Generate short stories with the given information"},
                {
                    "role":"user",
                    "content":`title:pirate adventure,\n
                                character1:{name:${character1.name}, hobby:${character1.hobby}, trait:${character1.trait}},\n
                                character2:{name:${character2.name}, hobby:${character2.hobby}, trait:${character2.trait}}`
                }
            ]
        })
    })
    const data = await response.json();
    return data.choices[0].message.content;
}

module.exports = fetchData
