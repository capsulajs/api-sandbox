
 Scenario: methods$ should return all available service methods in the selected environment
   Given API Sandbox Service with methods$ method
   And   an environment with several methods is selected
   When  user subscribes to methods$ with a valid MethodsRequest
   Then  user receives all available methods

  Scenario: selectMethod should select the provided service method
   Given API Sandbox Service with selectMethod method
   And   user received several service methods from methods$ subscription
   When  user calls selectMethod with a valid serviceName and methodName
   Then  the provided service method is selected

  Scenario: Call selectMethod with the name of an unexisting service
   Given API Sandbox Service with selectMethod method
   And   user received several service methods from methods$ subscription
   When  user calls selectMethod with an unexisting serviceName and valid methodName
   Then  a relevant error is returned

  Scenario: Call selectMethod with the name of an unexisting method
   Given API Sandbox Service with selectMethod method
   And   user received several service methods from methods$ subscription
   When  user calls selectMethod with an unexisting methodName and valid serviceName
   Then  a relevant error is returned

  Scenario: Call selectMethod with invalid serviceName
   Given API Sandbox Service with selectMethod method
   And   user received several service methods from methods$ subscription
   When  user calls selectMethod with a valid methodName one of the following <serviceName>
     	 |serviceName    |
         |null           |
         |undefined      |
         |123            |
         |[]             |
         |['test']       |
         |{}             |
         |{ test: 'test'}|
   Then  a relevant error is returned

  Scenario: Call selectMethod with invalid methodName
   Given API Sandbox Service with selectMethod method
   And   user received several service methods from methods$ subscription
   When  user calls selectMethod with a valid serviceName one of the following <methodName>
     	 |methodName     |
         |null           |
         |undefined      |
         |123            |
         |[]             |
         |['test']       |
         |{}             |
         |{ test: 'test'}|
   Then  a relevant error is returned

  Scenario: selectedMethod$ returns the currently selected service method
    Given API Sandbox Service with selectedMethod$ method
    And   user received several service methods from methods$ subscription
    And   an service method is selected
    When  user subscribes to selectedMethod$ method with a valid SelectedMethodRequest
    Then  user receives the currently selected service method
    And   the object emitted by selectedMethod$ has the following <property> and <type>
          |property        |type  |
          |serviceName     |String|
          |methodName      |String|
          |type            |'Observable' | 'Promise'|
          |requestTemplate |any[] |
          |documentation   |String|
    And  selectedMethod$ subscription emits new object each time the selected method is updated
    
  Scenario: selectedMethod$ while no service method is selected
    Given API Sandbox Service with selectedMethod$ method
    And   user received several service methods from methods$ subscription
    And   no service method is selected
    When  user subscribes to selectedMethod$ method with a valid SelectedMethodRequest
    Then  a relevant error is returned
