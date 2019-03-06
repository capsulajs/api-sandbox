
 Scenario: environments$ should return all available environments
   Given API Sandbox Service with environments$ method
   And   environment A, B and C are registered
   When  user subscribes to environments$ method with a valid EnvironmentsRequest
   Then  user receives environments A, B and C

 Scenario: Subscribe to environments$ when no available environment.
   Given API Sandbox Service with environments$ method
   And   no environment is registered
   When  user subscribes to environments$ method with a valid EnvironmentsRequest
   Then  user receives nothing

  Scenario: selectEnv should select the provided environment
   Given API Sandbox Service with selectEnv method
   And   user received environment A, B and C from environments$ subscription
   When  user calls selectEnv method by providing envKey: A
   Then  the environment A is selected

  Scenario: Call selectEnv with the name of a non existing environment
   Given API Sandbox Service with selectEnv method
   And   user received environment A, B and C from environments$ subscription
   When  user calls selectEnv method by providing a non existing environment name
   Then  an 'envNotFound' error is returned

  Scenario: Call selectEnv with already selected environment
   Given API Sandbox Service with selectEnv method
   And   user received environment A, B and C from environments$ subscription
   And   environment A is selected
   When  user calls selectEnv method by providing envKey: A
   Then  an 'envAlreadySelected' error is returned

  Scenario: Call selectEnv with invalid environment name
   Given API Sandbox Service with selectEnv method
   And   user received environment A, B and C from environments$ subscription
   When  user calls selectEnv method by providing one of the following <envName>
     	 |envName        |
         |null           |
         |undefined      |
         |123            |
         |[]             |
         |['test']       |
         |{}             |
         |{ test: 'test'}|
   Then  a 'envKeyIsNotCorrect' error is returned

  Scenario: selectedEnv$ returns the currently selected environment
    Given API Sandbox Service with selectedEnv$ method
    And   user received environment A, B and C from environments$ subscription
    And   environment A is selected
    When  user subscribes to selectedEnv$ method with a valid SelectedEnvRequest
    Then  user receives the selected environment (A)
    And   selectedEnv$ subscription emits new object each time an environment is selected.
