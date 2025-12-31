export const codeExamples = [
  {
    language: "bash",
    filename: "curl",
    code: `curl https://api.intelafrica.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5.2",
    "input": "Write a short bedtime story about a unicorn."
  }'`,
  },
  {
    language: "python",
    filename: "python",
    code: `import requests

response = requests.post(
    "https://api.intelafrica.com/v1/generate",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "model": "gpt-5.2",
        "input": "Write a short bedtime story about a unicorn."
    }
)

print(response.json())`,
  },
  {
    language: "javascript",
    filename: "javascript",
    code: `const response = await fetch(
  "https://api.intelafrica.com/v1/generate",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5.2",
      input: "Write a short bedtime story about a unicorn."
    })
  }
)

const data = await response.json()
console.log(data)`,
  },
  {
    language: "typescript",
    filename: "typescript",
    code: `interface ApiResponse {
  result: string;
  model: string;
}

const response = await fetch(
  "https://api.intelafrica.com/v1/generate",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5.2",
      input: "Write a short bedtime story about a unicorn."
    })
  }
)

const data: ApiResponse = await response.json()
console.log(data)`,
  },
  {
    language: "go",
    filename: "go",
    code: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://api.intelafrica.com/v1/generate"
    
    payload := map[string]string{
        "model": "gpt-5.2",
        "input": "Write a short bedtime story about a unicorn.",
    }
    
    jsonData, _ := json.Marshal(payload)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}`,
  },
  {
    language: "php",
    filename: "php",
    code: `<?php

$url = "https://api.intelafrica.com/v1/generate";

$data = array(
    "model" => "gpt-5.2",
    "input" => "Write a short bedtime story about a unicorn."
);

$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\\r\\n" .
                     "Authorization: Bearer YOUR_API_KEY\\r\\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
?>`,
  },
  {
    language: "ruby",
    filename: "ruby",
    code: `require 'net/http'
require 'json'
require 'uri'

uri = URI.parse("https://api.intelafrica.com/v1/generate")

request = Net::HTTP::Post.new(uri)
request.content_type = "application/json"
request["Authorization"] = "Bearer YOUR_API_KEY"

request.body = JSON.dump({
  "model" => "gpt-5.2",
  "input" => "Write a short bedtime story about a unicorn."
})

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

puts response.body`,
  },
  {
    language: "java",
    filename: "java",
    code: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class ApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        String json = """
            {
                "model": "gpt-5.2",
                "input": "Write a short bedtime story about a unicorn."
            }
            """;
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.intelafrica.com/v1/generate"))
            .header("Authorization", "Bearer YOUR_API_KEY")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        System.out.println(response.body());
    }
}`,
  },
];
