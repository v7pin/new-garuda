import axios from 'axios';

const sendUserInputToBackend = async (inputValue, selectedLanguage) => {
    try {
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
        const prompt = `${inputValue} give info (write me the response in ${selectedLanguage} language, and the answer should not exceed 40 words)`;

        const response = await axios.post(apiUrl, {
            prompt: prompt,
            length: 40, // Assuming 'length' is the correct field for specifying the maximum words, adjust according to the actual API documentation
            // Add other necessary fields according to the API's requirements
        });

        // Assuming the response structure contains a field 'data' that directly contains the generated text
        // Adjust the fields according to the actual response structure of your API
        const generatedText = response.data;

        return generatedText;
    } catch (error) {
        console.error('Error generating content:', error);
        return 'An error occurred while generating content.';
    }
};

export default sendUserInputToBackend;
