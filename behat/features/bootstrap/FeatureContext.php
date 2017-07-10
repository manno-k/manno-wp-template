<?php

use Behat\Mink\Driver\Selenium2Driver;
use Behat\Behat\Hook\Scope\AfterStepScope;
use Behat\MinkExtension\Context\RawMinkContext;

/**
 * Features context.
 */
class FeatureContext extends RawMinkContext {
    /**
     * Initializes context.
     * Every scenario gets it's own context object.
     *
     * @param array $parameters context parameters (set them up through behat.yml)
     */
    public function __construct() {
        // Initialize your context here
        $this->screenShotsPath = isset( $parameters[ 'screen_shots_path' ] ) ? $parameters[ 'screen_shots_path' ] : 'screen_shots';
    }


    /**
     * @Then I take all screenshots
     */
    public function iTakeAllScreenshots() {
        $pages = [ '/rent', '/sell', '/management', '/about' ];
        foreach ( $pages as $page ) {
            $this->visitPath( $page );
            $screen_shot = $this->getSession()->getDriver()->getScreenshot();
            $page = preg_replace( '/(\/)/', '-', $page );
            $directory_name = dirname( __FILE__ ) . '/../../screen_shots/all_page/' . $page . ".png";
            file_put_contents( $directory_name, $screen_shot );
        }
    }

    /**
     * @Then I take a screenshot of :page
     */
    public function iTakeAScreenshotOf( $page ) {
        $this->visitPath( $page );
        $this->getSession()->wait( 1000, "document.readyState === 'complete'" );
        $page = preg_replace( '/(\/)/', '-', $page );
        $screen_shot = $this->getSession()->getDriver()->getScreenshot();
        $directory_name = dirname( __FILE__ ) . '/../../screen_shots/' . $page . ".png";
        file_put_contents( $directory_name, $screen_shot );
    }


    /**
     * @Then /^I click on "([^"]*)"$/
     */
    public function iClickOn( $element ) {
        $page = $this->getSession()->getPage();
        $findName = $page->find( "css", $element );
        if ( ! $findName ) {
            throw new Exception( $element . " could not be found" );
        } else {
            $findName->click();
        }
    }

    /**
     * Take screenshot when step fails.
     * Works only with Selenium2Driver.
     *
     * @AfterStep
     */
    public function take_screenshot_after_failed( afterStepScope $scope ) {
        if ( 99 === $scope->getTestResult()->getResultCode() ) {
            $screen_shot = $this->getSession()->getDriver()->getScreenshot();
            $directory_name = dirname( __FILE__ ) . '/../../screen_shots/' . time() . ".png";
            file_put_contents( $directory_name, $screen_shot );

        }
    }

}
