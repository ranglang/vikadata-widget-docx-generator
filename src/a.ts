

import axios from 'axios';

export async function uploadDocument(arrayBuffer) {
    const url = 'https://api.pspdfkit.com/build';
    const token = 'pdf_live_cliHRdDYa05q7wJtNgQ2kyjuAlYQvVugHOindVXnhGz';
    const documentPath = 'document.docx';

    const formData = new FormData();
    // console.log('filexxxxxxx', file);
    // const newFile = new File([file], "name.docx");
    const blob = new Blob([arrayBuffer]);
    formData.append('document', blob, 'filename.docx');
    // await fs.promises.readFile(documentPath)
    // formData.append('document', newFile);
    formData.append(
        'instructions',
        JSON.stringify({
            parts: [
                {
                    file: 'document',
                },
            ],
        })
    );


    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
            },
            responseType: 'blob',
        });

        if (response.status === 200) {
            const url = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'result.pdf';
            link.click();
            URL.revokeObjectURL(url);
        } else {
            console.error('Request failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
    // try {
    //     const response = await axios.post(url, formData, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             ...formData.getHeaders(),
    //         },
    //         responseType: 'stream',
    //     });
    //
    //     const writer = fs.createWriteStream('result.pdf');
    //     response.data.pipe(writer);
    //
    //     return new Promise((resolve, reject) => {
    //         writer.on('finish', resolve);
    //         writer.on('error', reject);
    //     });
    // } catch (error) {
    //     console.error('An error occurred:', error);
    // }
}

// uploadDocument();
