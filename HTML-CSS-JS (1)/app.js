<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Key Search App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        select, button {
            margin-top: 10px;
            display: block;
            width: 200px;
            padding: 5px;
        }
        .info-container {
            position: fixed;
            right: 20px;
            top: 20px;
            width: 300px;
            padding: 10px;
            border: 1px solid #ccc;
            background: #f9f9f9;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: none; /* Hidden by default */
        }
        img {
            max-width: 100%;
            height: auto;
            margin-top: 20px;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
</head>
<body>
    <h1>Sami Auto Locksmith Key Lookup</h1>
    </div>
    <h6>Metal Keys, Transponders, and Universal Keys will not include FCC Identification</h6>

    <label for="year-select">Year:</label>
    <select id="year-select">
        <option value="">Select Year</option>
    </select>

    <label for="make-select">Make:</label>
    <select id="make-select" disabled>
        <option value="">Select Make</option>
    </select>

    <label for="model-select">Model:</label>
    <select id="model-select" disabled>
        <option value="">Select Model</option>
    </select>

    <div class="info-container" id="infoContainer">
        <h2>Key Details</h2>
        <img id="keyImage" src="" alt="Key Image">
        <p id="fccId/PN">FCC ID/PN: </p>
        <p id="regularPrice">Regular Price: </p>
        <p id="lostKeyPrice">Lost Key Price: </p>
    </div>

    <script>
        let data = [];

        const yearSelect = document.getElementById('year-select');
        const makeSelect = document.getElementById('make-select');
        const modelSelect = document.getElementById('model-select');
        const infoContainer = document.getElementById('infoContainer');

        // Load CSV data using PapaParse
        Papa.parse('keys_data.csv', {
            download: true,
            header: true,
            complete: function(results) {
                data = results.data;
                populateYears();
            }
        });

        // Populate years in the year select dropdown
        function populateYears() {
            const years = [...new Set(data.map(item => item.Year))].sort();
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        }

        // Add event listener for year select
        yearSelect.addEventListener('change', () => {
            const selectedYear = yearSelect.value;
            makeSelect.innerHTML = '<option value="">Select Make</option>'; // Reset make select
            modelSelect.innerHTML = '<option value="">Select Model</option>'; // Reset model select
            infoContainer.style.display = 'none'; // Hide info container
            makeSelect.disabled = true;
            modelSelect.disabled = true;

            if (selectedYear) {
                const makes = [...new Set(data.filter(item => item.Year === selectedYear).map(item => item.Make))].sort();
                makes.forEach(make => {
                    const option = document.createElement('option');
                    option.value = make;
                    option.textContent = make;
                    makeSelect.appendChild(option);
                });
                makeSelect.disabled = false;
            }
        });

        // Add event listener for make select
        makeSelect.addEventListener('change', () => {
            const selectedYear = yearSelect.value;
            const selectedMake = makeSelect.value;
            modelSelect.innerHTML = '<option value="">Select Model</option>'; // Reset model select
            infoContainer.style.display = 'none'; // Hide info container
            modelSelect.disabled = true;

            if (selectedMake) {
                const models = [...new Set(data.filter(item => item.Year === selectedYear && item.Make === selectedMake).map(item => item.Model))].sort();
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
                modelSelect.disabled = false;
            }
        });

        // Add event listener for model select
        modelSelect.addEventListener('change', () => {
            const selectedYear = yearSelect.value;
            const selectedMake = makeSelect.value;
            const selectedModel = modelSelect.value;

            if (selectedModel) {
                const item = data.find(item => item.Year === selectedYear && item.Make === selectedMake && item.Model === selectedModel);
                if (item) {
                    infoContainer.style.display = 'block';
                    document.getElementById('keyImage').src = item['Image'] || 'default-image.jpg';
                    document.getElementById('fccId/PN').textContent = `FCC ID/PN: ${item['FCC ID/PN'] || 'N/A'}`;
                    document.getElementById('regularPrice').textContent = `Regular Price: ${item['Regular Price'] || 'N/A'}`;
                    document.getElementById('lostKeyPrice').textContent = `Lost Key Price: ${item['Lost Key Price'] || 'N/A'}`;
                }
            } else {
                infoContainer.style.display = 'none';
            }
        });
    </script>
</body>
</html>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Key Search App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            select, button {
                margin-top: 10px;
                display: block;
                width: 200px;
                padding: 5px;
            }
            .info-container {
                position: fixed;
                right: 20px;
                top: 20px;
                width: 300px;
                padding: 10px;
                border: 1px solid #ccc;
                background: #f9f9f9;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                display: none; /* Hidden by default */
            }
            img {
                max-width: 100%;
                height: auto;
                margin-top: 20px;
            }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
    </head>
    <body>
        <h1>Sami Auto Locksmith Key Lookup</h1>
        </div>
        <h6>Metal Keys, Transponders, and Universal Keys will not include FCC ID/PNentification</h6>

        <label for="year-select">Year:</label>
        <select id="year-select">
            <option value="">Select Year</option>
        </select>

        <label for="make-select">Make:</label>
        <select id="make-select" disabled>
            <option value="">Select Make</option>
        </select>

        <label for="model-select">Model:</label>
        <select id="model-select" disabled>
            <option value="">Select Model</option>
        </select>

        <div class="info-container" id="infoContainer">
            <h2>Key Details</h2>
            <img id="keyImage" src="" alt="Key Image">
            <p id="fccId">FCC ID/PN: </p>
            <p id="regularPrice">Regular Price: </p>
            <p id="lostKeyPrice">Lost Key Price: </p>
        </div>

        <script>
            let data = [];

            const yearSelect = document.getElementById('year-select');
            const makeSelect = document.getElementById('make-select');
            const modelSelect = document.getElementById('model-select');
            const infoContainer = document.getElementById('infoContainer');

            // Load CSV data using PapaParse
            Papa.parse('keys_data.csv', {
                download: true,
                header: true,
                complete: function(results) {
                    data = results.data;
                    populateYears();
                }
            });

            // Populate years in the year select dropdown
            function populateYears() {
                const years = [...new Set(data.map(item => item.Year))].sort();
                years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                });
            }

            // Add event listener for year select
            yearSelect.addEventListener('change', () => {
                const selectedYear = yearSelect.value;
                makeSelect.innerHTML = '<option value="">Select Make</option>'; // Reset make select
                modelSelect.innerHTML = '<option value="">Select Model</option>'; // Reset model select
                infoContainer.style.display = 'none'; // Hide info container
                makeSelect.disabled = true;
                modelSelect.disabled = true;

                if (selectedYear) {
                    const makes = [...new Set(data.filter(item => item.Year === selectedYear).map(item => item.Make))].sort();
                    makes.forEach(make => {
                        const option = document.createElement('option');
                        option.value = make;
                        option.textContent = make;
                        makeSelect.appendChild(option);
                    });
                    makeSelect.disabled = false;
                }
            });

            // Add event listener for make select
            makeSelect.addEventListener('change', () => {
                const selectedYear = yearSelect.value;
                const selectedMake = makeSelect.value;
                modelSelect.innerHTML = '<option value="">Select Model</option>'; // Reset model select
                infoContainer.style.display = 'none'; // Hide info container
                modelSelect.disabled = true;

                if (selectedMake) {
                    const models = [...new Set(data.filter(item => item.Year === selectedYear && item.Make === selectedMake).map(item => item.Model))].sort();
                    models.forEach(model => {
                        const option = document.createElement('option');
                        option.value = model;
                        option.textContent = model;
                        modelSelect.appendChild(option);
                    });
                    modelSelect.disabled = false;
                }
            });

            // Add event listener for model select
            modelSelect.addEventListener('change', () => {
                const selectedYear = yearSelect.value;
                const selectedMake = makeSelect.value;
                const selectedModel = modelSelect.value;

                if (selectedModel) {
                    const item = data.find(item => item.Year === selectedYear && item.Make === selectedMake && item.Model === selectedModel);
                    if (item) {
                        infoContainer.style.display = 'block';
                        document.getElementById('keyImage').src = item['Image'] || 'default-image.jpg';
                        document.getElementById('fccId/PN').textContent = `FCC ID/PN: ${item['FCC ID/PN'] || 'N/A'}`;
                        document.getElementById('regularPrice').textContent = `Regular Price: ${item['Regular Price'] || 'N/A'}`;
                        document.getElementById('lostKeyPrice').textContent = `Lost Key Price: ${item['Lost Key Price'] || 'N/A'}`;
                    }
                } else {
                    infoContainer.style.display = 'none';
                }
            });
        </script>
    </body>
    </html>
