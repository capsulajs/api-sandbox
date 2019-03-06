
  Scenario: invoke method invokes the currently selected service method
    Given API Sandbox Service with invoke method
    And   user received several service methods from methods$ subscription
    And   an service method is selected
    When  user calls invoke method with a valid InvokeRequest
    Then  the selected method is invoked

  Scenario: Call invoke method with invalid data
    Given API Sandbox Service with invoke method
    And   user received several service methods from methods$ subscription
    And   an service method is selected
    When  user calls invoke method with one of the following <data>
          |data           |
          |null           |
          |undefined      |
          |123            |
          |'test'         |
          |[]             |
          |{}             |
          |{ test: 'test'}|
    Then  a relevant error is returned

  Scenario: logs$ method returns all the events related to invoke
    Given API Sandbox Service with logs and invoke methods
    When  user subscribes to logs$ method with a valid LogsRequest
    And   user calls invoke method with a valid InvokeRequest
    Then  user receive an event for InvokeRequest
    And   user receive an event for response
    And   each object emitted has the following <property> and <type>
    |property      |type                  |
    |timestamp     |number                |
    |correlationId |number                |
    |type          |'request' | 'response'|
    |serviceName   |String                |
    |methodName    |String                |
    |request       |InvokeRequest         |
    |response      |any                   |


  Scenario: Call invoke method when no method is currently selected
    Given API Sandbox Service with invoke method
    And   user received several service methods from methods$ subscription
    And   no service method is selected
    When  user calls invoke method with a valid InvokeRequest
    Then  a relevant error is returned
