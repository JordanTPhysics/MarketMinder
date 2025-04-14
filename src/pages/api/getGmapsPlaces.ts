import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Google Maps API key is missing' });
    }

    const textQuery = `${req.body.type} in ${req.body.city}, ${req.body.country}`;
    console.log('Text Query:', textQuery);

    const payload = {
        textQuery: textQuery,
    }

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': `places.displayName,places.types,places.formattedAddress,places.location,places.rating,places.websiteUri,places.name,places.nationalPhoneNumber`
    }

    const baseURL = `https://places.googleapis.com/v1/places:searchText`;

    const response = await fetch(baseURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        console.error('Error fetching data from Google Places API:', response.statusText);
        return res.status(response.status).json({ error: `Failed to fetch data from Google Places API ${response.statusText}` });
    }

    const data = await response.json();

    res.status(200).json(data);
}