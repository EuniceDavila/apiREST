# DefaultApi

All URIs are relative to *http://localhost:3000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**actorIdGet**](DefaultApi.md#actorIdGet) | **GET** /actor/{id} | Obtener actor por ID |


<a id="actorIdGet"></a>
# **actorIdGet**
> ActorIdGet200Response actorIdGet(id)

Obtener actor por ID

Devuelve los detalles de un actor especificado por su ID.

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DefaultApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:3000");

    DefaultApi apiInstance = new DefaultApi(defaultClient);
    Integer id = 56; // Integer | ID del actor
    try {
      ActorIdGet200Response result = apiInstance.actorIdGet(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DefaultApi#actorIdGet");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Integer**| ID del actor | |

### Return type

[**ActorIdGet200Response**](ActorIdGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Actor encontrado |  -  |
| **404** | Actor no encontrado |  -  |
| **500** | Error en el servidor |  -  |

