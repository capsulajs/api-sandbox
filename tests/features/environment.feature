
 Scenario: environments$ should return all available environments
   Given API Sandbox Service with environments$ method
   And   several registered environments
   When  user subscribes to environments$ method with a valid EnvironmentsRequest
   Then  user receives all available environments

  Scenario: selectEnv should select the provided environment
   Given API Sandbox Service with selectEnv method
   And   user received several environments from environments$ subscription
   When  user calls selectEnv method by providing the name of one of these environments
   Then  the provided environment is selected

  Scenario: Call selectEnv with the name of an unexisting environment
   Given API Sandbox Service with selectEnv method
   And   user received several environments from environments$ subscription
   When  user calls selectEnv method by providing an unexisting environment name
   Then  a relevant error is returned

  Scenario: Call selectEnv with invalid environment name
   Given API Sandbox Service with selectEnv method
   And   user received several environments from environments$ subscription
   When  user calls selectEnv method by providing one of the following <envName>
     	 |envName        |
         |null           |
         |undefined      |
         |123            |
         |[]             |
         |['test']       |
         |{}             |
         |{ test: 'test'}|
   Then  a relevant error is returned

  Scenario: selectedEnv$ returns the currently selected environment
    Given API Sandbox Service with selectedEnv$ method
    And   user received several environments from environments$ subscription
    And   an environment is selected
    When  user subscribes to selectedEnv$ method with a valid SelectedEnvRequest
    Then  user receives the currently selected environment
    And   selectedEnv$ subscription emits new object each time the selected env is updated
	
  Scenario: selectedEnv$ while no environment is selected
    Given API Sandbox Service with selectedEnv$ method
    And   user received several environments from environments$ subscription
    And   no environment is selected
    When  user subscribes to selectedEnv$ method with a valid SelectedEnvRequest
    Then  a relevant error is returned
