const express = require('express');
const bodyParser = require('body-parser');
const fillFormRPA = require('./fillFormRPA'); 
const app = express();
const port = process.env.PORT || 10000; 

app.use(bodyParser.json());

// सारथी का Webhook Endpoint
app.post('/fillform', async (req, res) => {
    const { target_url, form_data } = req.body;
    
    if (!target_url || !form_data) {
        return res.status(400).json({ status: 'error', message: 'Missing target_url or form_data' });
    }

    try {
        const result = await fillFormRPA(target_url, form_data);
        
        // सारथी को परिणाम वापस भेजें 
        return res.status(200).json({ status: 'success', message: 'RPA Form Submission Complete.', result_data: result });
        
    } catch (error) {
        console.error('RPA Error:', error);
        return res.status(500).json({ status: 'error', message: `Form filling failed due to server error: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Saarthi RPA Server running on port ${port}`);
});
