Feature: Take screenshots of All pages

  @javascript
  Scenario: Take screenshots
    Given the screen size is 320x900
#    Given I am on "/sell"
    Then I take all screenshots
#    Then I take a screenshot of "/rent"
#    Then I take a screenshot of "/sell"
