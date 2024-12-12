
const axios = require('axios');
const express = require("express");
const router = express.Router();
// const API_KEY = "v7FvIIqgwaFukuXVpOd91Kw_nEbxxWl-Iybca-lTyywPoe-TgcTeyKoSh5snJpiDqd0EUP4qvg7b-SS6kdU6THaqxM-dg9LFtUvaseo_b6axcQRKp_NrdwCZ6co4_w9j_yGaqTZuY31eHXLiCeo8KUM4bJO2NnpnhGVlL7NWSAk87Mm7VH8SNndyNs_uDnfH16oLLpDPEJabFNlx23oZ1-XKDj1eQ_UJ46UiI7hrA3F2XsfYeO8Q8LB_a8-F6ir1PmXFER5eRCM8sjrD-gv3UQh3B3NGSkQCVzfjtf7I6IdzadcyJzDCETEc7tkKIzthNFL7RhSJx11tnj1AuS0uEjgZxDzFjVJfUpaKhPd0bKgZeS6Ip8byu7UdXhiu2C3BghzMHD0nKfxnFLiCtb_Py8E0AT3boXUGLR66Xfyei0laJVVGn8BDYv5-CTQzWrrRWwcI4H5KJ2tx3w5y4L-tVPBtRRS7kGK0wVWvIopbnwnNOXItkiFrHRzOBsthXy-u68WBGTfueV9tY2Oi6_SyNnruXsukO3--8PVuhd230IMKWlxt5ldP9AR_om8nmPzyOjsi7byVPiYczMUlxUiHo7WvL5h31KDm3HrgVOl5QlHXbxI1WGxsS6K4x_qK66Dsn4YQuhBh5SLsQkZ9IKGSTgN2y7QI3BYcKlXbZd-UrvZreW-pyaVfhlGoz00Z1aXLOnFVWg";
// const API_KEY_Test = "rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL";
let BASE_URL = 'https://api-sa.myfatoorah.com';
let BASE_URL_Test = 'https://apitest.myfatoorah.com';

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/createPaymentLink', async (req, res) => {    
  try {

    if(req.body.displayCurrencyIso=="SAR"){
      console.log("SAUDI");
      BASE_URL= "https://api-sa.myfatoorah.com/";
    }else if(req.body.displayCurrencyIso=="QAR"){
      BASE_URL= " https://api-qa.myfatoorah.com/";
      console.log("QATAR");
    }else{
      BASE_URL= "https://api.myfatoorah.com/";
      console.log("Other Countries");
    }
    const paymentData = {
      NotificationOption: 'All',
      CustomerName: req.body.name,
      DisplayCurrencyIso: req.body.displayCurrencyIso,
      MobileCountryCode: req.body.mobileCountryCode,
      CustomerMobile: req.body.mobile,
      CustomerEmail: 'Ali@gmail.com', 
      InvoiceValue: req.body.price, 
      CallBackUrl: req.body.callBackUrl, 
      ErrorUrl: req.body.errorUrl, 
      Language: req.body.language,
      CustomerReference: 'ref 1',
      identity: '052489',
      InvoiceItems: [{ ItemName: req.body.offer_name, Quantity: 1, UnitPrice: req.body.price }], 
    };

    const response = await axios.post(`${BASE_URL}/v2/ExecutePayments`, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating payment:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});


router.get('/initiatePayment', async (req, res) => {
  try {
    const payload = {
    };
    
    const response = await axios.post(
      `${BASE_URL}/v2/InitiatePayment`,payload,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // List of payment methods
    const paymentMethods = response.data.Data.PaymentMethods;
    res.send(response.data)
    console.log('Available Payment Methods:', paymentMethods);
  } catch (error) {
    res.status(500).send(error);
  }
}
)
router.post('/paymentStatus', async (req, res) => {
  try {

    const payload = {
      "Key": req.body.key,
      "KeyType": 'invoiceid'
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.body.isTest?API_KEY_Test:API_KEY}`, // Replace with your MyFatoorah API key
    };

    // Execute the payment using MyFatoorah's API
    const response = req.body.isTest?
      await axios.post(`https://apitest.myfatoorah.com/v2/getPaymentStatus`, payload, { headers }):
     await axios.post(`https://api-sa.myfatoorah.com/v2/getPaymentStatus`, payload, { headers });

    
    if (response.data.IsSuccess) {
    
      // console.log('Payment executed successfully:', response.data);
      res.status(200).send(response.data);
    
    } else {
      res.status(400).send(response.data.data);
    }
  } catch (error) {
    res.status(500).send(error);

    throw error;
  }
}
)
  
  router.post('/excecutePayment', async (req, res) => {
    try {
      const paymentData = {
        PaymentMethodId: req.body.paymentMethodId,
        InvoiceValue:req.body.price, 
        CallBackUrl: req.body.callBackUrl,
        displayCurrencyIso:req.body.displayCurrencyIso,
        ErrorUrl: req.body.errorUrl, 
        Language: 'en', 
      };
      if(req.body.displayCurrencyIso=="SAR"){
        console.log("SAUDI");
        BASE_URL= "https://api-sa.myfatoorah.com/";
      }else if(req.body.displayCurrencyIso=="QAR"){
        BASE_URL= " https://api-qa.myfatoorah.com/";
        console.log("QATAR");
      }else{
        BASE_URL= "https://api.myfatoorah.com/";
        console.log("Other Countries");
      }

      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${req.body.isTest?API_KEY_Test : API_KEY}`, // Replace with your MyFatoorah API key
      };
  
      // Execute the payment using MyFatoorah's API
      const response = await axios.post(`${req.body.isTest?BASE_URL_Test:BASE_URL}/v2/ExecutePayment`,paymentData, { headers });
  
      // Handle the response from MyFatoorah
      if (response.data.IsSuccess) {
        console.log('Payment executed successfully:', response.data);
         res.status(201).send(response.data);
      } else {
        res.status(400).send(error);
        // console.error('Payment execution failed:', response.data);
        // throw new Error('Payment execution failed');
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
)


module.exports = router;
