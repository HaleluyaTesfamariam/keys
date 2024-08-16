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

        .selectors {
            display: flex;
            gap: 30px; /* Increased gap between boxes */
            margin-bottom: 20px;
        }

        select, button {
            width: 350px; /* Increased width */
            padding: 15px; /* Increased padding */
            font-size: 18px; /* Increased font size */
        }

        .key-details-container {
            margin-top: 20px;
        }

        .key-detail-box {
            border: 1px solid #ccc;
            padding: 25px; /* Increased padding */
            margin-bottom: 20px; /* Increased margin */
            box-shadow: 0 0 7px rgba(0, 0, 0, 0.1); /* Slightly larger shadow */
            font-size: 20px; /* Increased font size */
        }

        .key-detail-box img {
            max-width: 100%;
            height: auto;
            margin-bottom: 15px;
        }

        .key-detail-box p {
            margin: 12px 0;
        }

        .price {
            color: green;
            font-weight: bold; /* Make price text bold */
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
</head>
<body>
    <h1>Sami AutoLocksmith Key Lookup</h1>
    <h6>Metal Keys, Transponders, and Universal Keys will not include FCC Identification</h6>

    <div class="selectors">
        <select id="year-select">
            <option value="">Select Year</option>
        </select>
        <select id="make-select" disabled>
            <option value="">Select Make</option>
        </select>
        <select id="model-select" disabled>
            <option value="">Select Model</option>
        </select>
    </div>

    <div class="key-details-container" id="keyDetailsContainer">
        <!-- Key details will be populated here -->
    </div>

    <script>
        let data = [];
        const yearSelect = document.getElementById('year-select');
        const makeSelect = document.getElementById('make-select');
        const modelSelect = document.getElementById('model-select');
        const keyDetailsContainer = document.getElementById('keyDetailsContainer');

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
            keyDetailsContainer.innerHTML = ''; // Clear key details container
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
            keyDetailsContainer.innerHTML = ''; // Clear key details container
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
                const items = data.filter(item => item.Year === selectedYear && item.Make === selectedMake && item.Model === selectedModel);
                keyDetailsContainer.innerHTML = ''; // Clear key details container
                items.forEach(item => {
                    const keyDetailBox = document.createElement('div');
                    keyDetailBox.classList.add('key-detail-box');

                    const keyImage = document.createElement('img');
                    keyImage.src = item['Image URL'] || 'default-image.jpg';
                    keyDetailBox.appendChild(keyImage);

                    const fccId = document.createElement('p');
                    fccId.textContent = `FCC ID: ${item['FCC ID'] || 'N/A'}`;
                    keyDetailBox.appendChild(fccId);

                    const pn = document.createElement('p');
                    pn.textContent = `PN #: ${item['PN #'] || 'N/A'}`;
                    keyDetailBox.appendChild(pn);

                    const battery = document.createElement('p');
                    battery.textContent = `Battery: ${item['Battery'] || 'N/A'}`;
                    keyDetailBox.appendChild(battery);

                    const frequency = document.createElement('p');
                    frequency.textContent = `Frequency: ${item['Frequency'] || 'N/A'}`;
                    keyDetailBox.appendChild(frequency);

                    const chip = document.createElement('p');
                    chip.textContent = `Chip: ${item['Chip'] || 'N/A'}`;
                    keyDetailBox.appendChild(chip);

                    const regularPrice = document.createElement('p');
                    regularPrice.classList.add('price');
                    regularPrice.textContent = `Regular Price: ${item['Regular Price'] || 'N/A'}`;
                    keyDetailBox.appendChild(regularPrice);

                    const lostKeyPrice = document.createElement('p');
                    lostKeyPrice.classList.add('price');
                    lostKeyPrice.textContent = `Lost Key Price: ${item['Lost Key Price'] || 'N/A'}`;
                    keyDetailBox.appendChild(lostKeyPrice);

                    keyDetailsContainer.appendChild(keyDetailBox);
                });
            } else {
                keyDetailsContainer.innerHTML = ''; // Clear key details container if no model is selected
            }
        });
    </script>
</body>
</html>
