describe('scraperify webapp', function () {
    it('should retrieve results from victorbarcelo.net', function () {
        browser.get('http://localhost:3000/#/main');

        //element(by.id('scrapBtn')).click();
        element(by.css('[ng-click="main.doClick()"]')).click();


        var scraps = element.all(by.repeater('node in main.nodes track by $index'));
        //browser.pause();
        expect(scraps.count()).toBeGreaterThan(0);
        //expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
});