document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (hamburgerBtn && mobileNavMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileNavMenu.classList.toggle('active');
        });

        // Close drawer when clicking outside or clicking any nav link inside mobile-nav
        document.addEventListener('click', (event) => {
            const header = document.querySelector('.header');
            // Check if the click is outside the header and mobile nav, or on a mobile nav link
            if ((!header.contains(event.target) && !mobileNavMenu.contains(event.target)) || event.target.closest('#mobile-nav-menu a')) {
                hamburgerBtn.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
        });
    }

    // 2. Animated Molecular Network Background
    const molecularCanvas = document.getElementById('molecular-network');

    if (molecularCanvas) {
        const ctx = molecularCanvas.getContext('2d');
        const heroSection = molecularCanvas.closest('.hero');
        const elementSymbols = ['H', 'O', 'C', 'N', 'Fe', 'Na', 'Cl', 'Au', 'Mg', 'Si', 'K', 'P', 'S', 'Cu', 'Ca'];
        const nodeColors = ['#2E6DA4', '#4A9E9E', '#7B5EA7', '#C8A84B', '#1D3D6B'];
        const nodeCount = 56;
        const pulseDuration = 6000;
        const bondDistance = 130;
        let canvasWidth = heroSection.offsetWidth;
        let canvasHeight = heroSection.offsetHeight;
        let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        function hexToRgb(hex) {
            const value = hex.replace('#', '');
            return {
                r: parseInt(value.slice(0, 2), 16),
                g: parseInt(value.slice(2, 4), 16),
                b: parseInt(value.slice(4, 6), 16)
            };
        }

        function randomVelocity() {
            return Math.random() * 0.7 - 0.35;
        }

        function resizeMolecularCanvas() {
            canvasWidth = heroSection.offsetWidth;
            canvasHeight = heroSection.offsetHeight;
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            molecularCanvas.width = Math.floor(canvasWidth * pixelRatio);
            molecularCanvas.height = Math.floor(canvasHeight * pixelRatio);
            molecularCanvas.style.width = '100%';
            molecularCanvas.style.height = '100%';
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        }

        const nodes = Array.from({ length: nodeCount }, (_, index) => {
            const color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
            return {
                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight,
                vx: randomVelocity(),
                vy: randomVelocity(),
                radius: 3 + Math.random() * 4,
                symbol: elementSymbols[index % elementSymbols.length],
                color,
                rgb: hexToRgb(color),
                phase: Math.random() * Math.PI * 2
            };
        });

        function drawMolecularNetwork(time) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let i = 0; i < nodes.length; i += 1) {
                const first = nodes[i];

                for (let j = i + 1; j < nodes.length; j += 1) {
                    const second = nodes[j];
                    const dx = first.x - second.x;
                    const dy = first.y - second.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance <= bondDistance) {
                        const alpha = (1 - distance / bondDistance) * 0.28;
                        ctx.beginPath();
                        ctx.moveTo(first.x, first.y);
                        ctx.lineTo(second.x, second.y);
                        ctx.strokeStyle = `rgba(46, 109, 164, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0) node.x = canvasWidth;
                if (node.x > canvasWidth) node.x = 0;
                if (node.y < 0) node.y = canvasHeight;
                if (node.y > canvasHeight) node.y = 0;

                const pulse = Math.sin((time / pulseDuration) * Math.PI * 2 + node.phase) * 1.5;
                const radius = node.radius + pulse;
                const { r, g, b } = node.rgb;

                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.16)`;
                ctx.fill();
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.35)`;
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.font = '10px "JetBrains Mono", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.65)`;
                ctx.fillText(node.symbol, node.x, node.y + radius + 4);
            });

            requestAnimationFrame(drawMolecularNetwork);
        }

        resizeMolecularCanvas();
        window.addEventListener('resize', resizeMolecularCanvas);
        requestAnimationFrame(drawMolecularNetwork);
    }

    // 3. Event Opening Live Countdown Timer
    const countdownTimer = document.getElementById('countdown-timer');
    if (countdownTimer) {
        // Note: Months are 0-indexed in JS (0 = January, 8 = September)
        const targetDate = new Date(2026, 8, 9, 10, 0, 0).getTime();

        const periodicElements = [
            { number: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008', family: 'Reactive nonmetal' },
            { number: 2, symbol: 'He', name: 'Helium', mass: '4.0026', family: 'Noble gas' },
            { number: 3, symbol: 'Li', name: 'Lithium', mass: '6.94', family: 'Alkali metal' },
            { number: 4, symbol: 'Be', name: 'Beryllium', mass: '9.0122', family: 'Alkaline earth metal' },
            { number: 5, symbol: 'B', name: 'Boron', mass: '10.81', family: 'Metalloid' },
            { number: 6, symbol: 'C', name: 'Carbon', mass: '12.011', family: 'Reactive nonmetal' },
            { number: 7, symbol: 'N', name: 'Nitrogen', mass: '14.007', family: 'Reactive nonmetal' },
            { number: 8, symbol: 'O', name: 'Oxygen', mass: '15.999', family: 'Reactive nonmetal' },
            { number: 9, symbol: 'F', name: 'Fluorine', mass: '18.998', family: 'Halogen' },
            { number: 10, symbol: 'Ne', name: 'Neon', mass: '20.180', family: 'Noble gas' },
            { number: 11, symbol: 'Na', name: 'Sodium', mass: '22.990', family: 'Alkali metal' },
            { number: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.305', family: 'Alkaline earth metal' },
            { number: 13, symbol: 'Al', name: 'Aluminum', mass: '26.982', family: 'Post-transition metal' },
            { number: 14, symbol: 'Si', name: 'Silicon', mass: '28.085', family: 'Metalloid' },
            { number: 15, symbol: 'P', name: 'Phosphorus', mass: '30.974', family: 'Reactive nonmetal' },
            { number: 16, symbol: 'S', name: 'Sulfur', mass: '32.06', family: 'Reactive nonmetal' },
            { number: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45', family: 'Halogen' },
            { number: 18, symbol: 'Ar', name: 'Argon', mass: '39.948', family: 'Noble gas' },
            { number: 19, symbol: 'K', name: 'Potassium', mass: '39.098', family: 'Alkali metal' },
            { number: 20, symbol: 'Ca', name: 'Calcium', mass: '40.078', family: 'Alkaline earth metal' },
            { number: 21, symbol: 'Sc', name: 'Scandium', mass: '44.956', family: 'Transition metal' },
            { number: 22, symbol: 'Ti', name: 'Titanium', mass: '47.867', family: 'Transition metal' },
            { number: 23, symbol: 'V', name: 'Vanadium', mass: '50.942', family: 'Transition metal' },
            { number: 24, symbol: 'Cr', name: 'Chromium', mass: '51.996', family: 'Transition metal' },
            { number: 25, symbol: 'Mn', name: 'Manganese', mass: '54.938', family: 'Transition metal' },
            { number: 26, symbol: 'Fe', name: 'Iron', mass: '55.845', family: 'Transition metal' },
            { number: 27, symbol: 'Co', name: 'Cobalt', mass: '58.933', family: 'Transition metal' },
            { number: 28, symbol: 'Ni', name: 'Nickel', mass: '58.693', family: 'Transition metal' },
            { number: 29, symbol: 'Cu', name: 'Copper', mass: '63.546', family: 'Transition metal' },
            { number: 30, symbol: 'Zn', name: 'Zinc', mass: '65.38', family: 'Transition metal' },
            { number: 31, symbol: 'Ga', name: 'Gallium', mass: '69.723', family: 'Post-transition metal' },
            { number: 32, symbol: 'Ge', name: 'Germanium', mass: '72.630', family: 'Metalloid' },
            { number: 33, symbol: 'As', name: 'Arsenic', mass: '74.922', family: 'Metalloid' },
            { number: 34, symbol: 'Se', name: 'Selenium', mass: '78.971', family: 'Reactive nonmetal' },
            { number: 35, symbol: 'Br', name: 'Bromine', mass: '79.904', family: 'Halogen' },
            { number: 36, symbol: 'Kr', name: 'Krypton', mass: '83.798', family: 'Noble gas' },
            { number: 37, symbol: 'Rb', name: 'Rubidium', mass: '85.468', family: 'Alkali metal' },
            { number: 38, symbol: 'Sr', name: 'Strontium', mass: '87.62', family: 'Alkaline earth metal' },
            { number: 39, symbol: 'Y', name: 'Yttrium', mass: '88.906', family: 'Transition metal' },
            { number: 40, symbol: 'Zr', name: 'Zirconium', mass: '91.224', family: 'Transition metal' },
            { number: 41, symbol: 'Nb', name: 'Niobium', mass: '92.906', family: 'Transition metal' },
            { number: 42, symbol: 'Mo', name: 'Molybdenum', mass: '95.95', family: 'Transition metal' },
            { number: 43, symbol: 'Tc', name: 'Technetium', mass: '98', family: 'Transition metal' },
            { number: 44, symbol: 'Ru', name: 'Ruthenium', mass: '101.07', family: 'Transition metal' },
            { number: 45, symbol: 'Rh', name: 'Rhodium', mass: '102.91', family: 'Transition metal' },
            { number: 46, symbol: 'Pd', name: 'Palladium', mass: '106.42', family: 'Transition metal' },
            { number: 47, symbol: 'Ag', name: 'Silver', mass: '107.87', family: 'Transition metal' },
            { number: 48, symbol: 'Cd', name: 'Cadmium', mass: '112.41', family: 'Transition metal' },
            { number: 49, symbol: 'In', name: 'Indium', mass: '114.82', family: 'Post-transition metal' },
            { number: 50, symbol: 'Sn', name: 'Tin', mass: '118.71', family: 'Post-transition metal' },
            { number: 51, symbol: 'Sb', name: 'Antimony', mass: '121.76', family: 'Metalloid' },
            { number: 52, symbol: 'Te', name: 'Tellurium', mass: '127.60', family: 'Metalloid' },
            { number: 53, symbol: 'I', name: 'Iodine', mass: '126.90', family: 'Halogen' },
            { number: 54, symbol: 'Xe', name: 'Xenon', mass: '131.29', family: 'Noble gas' },
            { number: 55, symbol: 'Cs', name: 'Cesium', mass: '132.91', family: 'Alkali metal' },
            { number: 56, symbol: 'Ba', name: 'Barium', mass: '137.33', family: 'Alkaline earth metal' },
            { number: 57, symbol: 'La', name: 'Lanthanum', mass: '138.91', family: 'Lanthanide' },
            { number: 58, symbol: 'Ce', name: 'Cerium', mass: '140.12', family: 'Lanthanide' },
            { number: 59, symbol: 'Pr', name: 'Praseodymium', mass: '140.91', family: 'Lanthanide' },
            { number: 60, symbol: 'Nd', name: 'Neodymium', mass: '144.24', family: 'Lanthanide' },
            { number: 61, symbol: 'Pm', name: 'Promethium', mass: '145', family: 'Lanthanide' },
            { number: 62, symbol: 'Sm', name: 'Samarium', mass: '150.36', family: 'Lanthanide' },
            { number: 63, symbol: 'Eu', name: 'Europium', mass: '151.96', family: 'Lanthanide' },
            { number: 64, symbol: 'Gd', name: 'Gadolinium', mass: '157.25', family: 'Lanthanide' },
            { number: 65, symbol: 'Tb', name: 'Terbium', mass: '158.93', family: 'Lanthanide' },
            { number: 66, symbol: 'Dy', name: 'Dysprosium', mass: '162.50', family: 'Lanthanide' },
            { number: 67, symbol: 'Ho', name: 'Holmium', mass: '164.93', family: 'Lanthanide' },
            { number: 68, symbol: 'Er', name: 'Erbium', mass: '167.26', family: 'Lanthanide' },
            { number: 69, symbol: 'Tm', name: 'Thulium', mass: '168.93', family: 'Lanthanide' },
            { number: 70, symbol: 'Yb', name: 'Ytterbium', mass: '173.05', family: 'Lanthanide' },
            { number: 71, symbol: 'Lu', name: 'Lutetium', mass: '174.97', family: 'Lanthanide' },
            { number: 72, symbol: 'Hf', name: 'Hafnium', mass: '178.49', family: 'Transition metal' },
            { number: 73, symbol: 'Ta', name: 'Tantalum', mass: '180.95', family: 'Transition metal' },
            { number: 74, symbol: 'W', name: 'Tungsten', mass: '183.84', family: 'Transition metal' },
            { number: 75, symbol: 'Re', name: 'Rhenium', mass: '186.21', family: 'Transition metal' },
            { number: 76, symbol: 'Os', name: 'Osmium', mass: '190.23', family: 'Transition metal' },
            { number: 77, symbol: 'Ir', name: 'Iridium', mass: '192.22', family: 'Transition metal' },
            { number: 78, symbol: 'Pt', name: 'Platinum', mass: '195.08', family: 'Transition metal' },
            { number: 79, symbol: 'Au', name: 'Gold', mass: '196.97', family: 'Transition metal' },
            { number: 80, symbol: 'Hg', name: 'Mercury', mass: '200.59', family: 'Transition metal' }
        ];

        const countdownUnits = {
            days: {
                rollover: 80,
                number: document.getElementById('days-number'),
                mass: document.getElementById('days-mass'),
                symbol: document.getElementById('days-symbol'),
                name: document.getElementById('days-name'),
                family: document.getElementById('days-family')
            },
            hours: {
                rollover: 24,
                number: document.getElementById('hours-number'),
                mass: document.getElementById('hours-mass'),
                symbol: document.getElementById('hours-symbol'),
                name: document.getElementById('hours-name'),
                family: document.getElementById('hours-family')
            },
            minutes: {
                rollover: 60,
                number: document.getElementById('minutes-number'),
                mass: document.getElementById('minutes-mass'),
                symbol: document.getElementById('minutes-symbol'),
                name: document.getElementById('minutes-name'),
                family: document.getElementById('minutes-family')
            },
            seconds: {
                rollover: 60,
                number: document.getElementById('seconds-number'),
                mass: document.getElementById('seconds-mass'),
                symbol: document.getElementById('seconds-symbol'),
                name: document.getElementById('seconds-name'),
                family: document.getElementById('seconds-family')
            }
        };

        function getElementForCountdown(value, rollover) {
            const normalizedValue = value === 0 ? rollover : Math.min(Math.max(value, 1), 80);
            return periodicElements[normalizedValue - 1];
        }

        function renderCountdownCard(unit, value) {
            const config = countdownUnits[unit];
            const element = getElementForCountdown(value, config.rollover);

            if (config.number && element) {
                config.number.textContent = String(element.number).padStart(2, '0');
                config.mass.textContent = element.mass;
                config.symbol.textContent = element.symbol;
                config.name.textContent = element.name;
                config.family.textContent = element.family;
            }
        }

        let countdownInterval;

        function updateCountdown() {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(countdownInterval);
                renderCountdownCard('days', 0);
                renderCountdownCard('hours', 0);
                renderCountdownCard('minutes', 0);
                renderCountdownCard('seconds', 0);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            renderCountdownCard('days', days);
            renderCountdownCard('hours', hours);
            renderCountdownCard('minutes', minutes);
            renderCountdownCard('seconds', seconds);
        }

        // Initialize countdown immediately and then set the interval.
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 4. Dynamic Schedule Loader
    const scheduleWrapper = document.getElementById('schedule-wrapper');
    if (scheduleWrapper) {
        fetch('pages/schedule.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(htmlText => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                const container = doc.querySelector('.container');
                if (container) {
                    scheduleWrapper.appendChild(container);
                    initializeScheduleAccordion();
                } else {
                    console.error('Could not find .container in schedule.html');
                }
            })
            .catch(error => {
                console.error('Error loading dynamic schedule:', error);
                scheduleWrapper.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <p>Unable to load event schedule. Please try refreshing the page.</p>
                    </div>
                `;
            });
    }

    function initializeScheduleAccordion() {
        const timelineItems = scheduleWrapper.querySelectorAll('.timeline-item.has-details');
        timelineItems.forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') return;

                timelineItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                item.classList.toggle('active');
            });
        });
    }
});