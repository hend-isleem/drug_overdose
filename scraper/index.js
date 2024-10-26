const { PlaywrightCrawler } = require('crawlee');

(async () => {
  const crawler = new PlaywrightCrawler({
    headless: false,
    async requestHandler({ page }) {
      // Navigate to the interaction input page
      await page.goto('https://www.drugs.com/interaction/list/', { waitUntil: 'commit' });

      // Function to add a drug and wait for the page to refresh
      async function addDrug(drugName) {
        console.log(`Adding ${drugName}`);
        await page.type('#livesearch-interaction', drugName);
        await page.keyboard.press('Enter'); // Press Enter to select the drug
        await page.waitForTimeout(500); // Wait for the drug to be added and processed
        console.log(`${drugName} added successfully.`);
      }

      // Add the drugs
      await addDrug('Aspirin');
      await addDrug('Ibuprofen');
      await addDrug('Metformin'); // Example drug, you can add more

      // Click the "Check Interactions" link
      await page.click('a:has-text("Check Interactions")');

      // Extract interaction data only from "Interactions between your drugs"
      const interactions = await page.evaluate(() => {
        const interactionData = [];

        // Locate "Interactions between your drugs" section
        const interactionSection = Array.from(document.querySelectorAll('h2')).find((heading) => heading.textContent.trim().toLowerCase() === 'interactions between your drugs');

        if (interactionSection) {
          const references = interactionSection.parentElement.querySelectorAll('.interactions-reference');

          references.forEach((reference) => {
            const severity = reference.querySelector('.ddc-status-label')?.innerText.trim();
            const drugs = reference.querySelector('h3')?.innerText.trim();

            // Collect all <p> tags for the full description
            const descriptionElements = reference.querySelectorAll('p');
            const description = Array.from(descriptionElements).map((p) => p.innerText);

            // Exclude food interactions and therapeutic duplication
            if (
              drugs
                            && !drugs.toLowerCase().includes('food')
                            && !drugs.toLowerCase().includes('therapeutic duplication')
                            && !severity.toLowerCase().includes('duplication')
            ) {
              interactionData.push({
                severity,
                drugs,
                description: description.slice(1, -1).join(' '),
              });
            }
          });
        } else {
          console.log('No "Interactions between your drugs" section found.');
        }

        return interactionData;
      });

      // Log only the drug-to-drug interactions
      if (interactions.length > 0) {
        interactions.forEach((interaction, index) => {
          console.log(`Interaction ${index + 1}:\nSeverity: ${interaction.severity}\nDrugs: ${interaction.drugs}\nDescription: ${interaction.description}\n`);
        });
      } else {
        console.log('No interactions found.');
      }
    },
  });

  await crawler.run(['https://www.drugs.com/interaction/list/']);

  console.log('Crawling complete.');
})();
