export const codeExamples = [
  {
    language: "bash",
    filename: "curl",
    code: `curl -X POST "https://api.intelligenceafrica.com/v1/stt/transcribe" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -F "file=@audio.mp3" \\
  -F "model=intel-griot"`,
  },
  {
    language: "python",
    filename: "python",
    code: `import requests

with open("audio.mp3", "rb") as audio_file:
    response = requests.post(
        "https://api.intelligenceafrica.com/v1/stt/transcribe",
        headers={
            "x-api-key": "YOUR_API_KEY"
        },
        files={
            "file": audio_file
        },
        data={
            "model": "intel-griot"
        }
    )

print(response.json())`,
  },
  {
    language: "javascript",
    filename: "javascript",
    code: `const formData = new FormData()
formData.append("file", audioFile) // audioFile is a File object
formData.append("model", "intel-griot")

const response = await fetch(
  "https://api.intelligenceafrica.com/v1/stt/transcribe",
  {
    method: "POST",
    headers: {
      "x-api-key": "YOUR_API_KEY"
    },
    body: formData
  }
)

const data = await response.json()
console.log(data)`,
  },
  {
    language: "typescript",
    filename: "typescript",
    code: `interface TranscriptionResponse {
  text: string;
  language?: string;
  duration?: number;
}

const formData = new FormData()
formData.append("file", audioFile) // audioFile is a File object
formData.append("model", "intel-griot")

const response = await fetch(
  "https://api.intelligenceafrica.com/v1/stt/transcribe",
  {
    method: "POST",
    headers: {
      "x-api-key": "YOUR_API_KEY"
    },
    body: formData
  }
)

const data: TranscriptionResponse = await response.json()
console.log(data)`,
  },
  {
    language: "go",
    filename: "go",
    code: `package main

import (
    "bytes"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "os"
)

func main() {
    url := "https://api.intelligenceafrica.com/v1/stt/transcribe"
    
    file, _ := os.Open("audio.mp3")
    defer file.Close()
    
    body := &bytes.Buffer{}
    writer := multipart.NewWriter(body)
    
    part, _ := writer.CreateFormFile("file", "audio.mp3")
    io.Copy(part, file)
    
    writer.WriteField("model", "intel-griot")
    writer.Close()
    
    req, _ := http.NewRequest("POST", url, body)
    req.Header.Set("x-api-key", "YOUR_API_KEY")
    req.Header.Set("Content-Type", writer.FormDataContentType())
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    result, _ := io.ReadAll(resp.Body)
    fmt.Println(string(result))
}`,
  },
  {
    language: "php",
    filename: "php",
    code: `<?php

$url = "https://api.intelligenceafrica.com/v1/stt/transcribe";

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => array(
        "x-api-key: YOUR_API_KEY"
    ),
    CURLOPT_POSTFIELDS => array(
        'file' => new CURLFile('audio.mp3'),
        'model' => 'intel-griot'
    )
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>`,
  },
  {
    language: "ruby",
    filename: "ruby",
    code: `require 'net/http'
require 'uri'

uri = URI.parse("https://api.intelligenceafrica.com/v1/stt/transcribe")

request = Net::HTTP::Post.new(uri)
request["x-api-key"] = "YOUR_API_KEY"

form_data = [
  ['file', File.open('audio.mp3')],
  ['model', 'intel-griot']
]

request.set_form(form_data, 'multipart/form-data')

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
import java.nio.file.Path;

public class TranscriptionExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        String boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
        Path audioPath = Path.of("audio.mp3");
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.intelligenceafrica.com/v1/stt/transcribe"))
            .header("x-api-key", "YOUR_API_KEY")
            .header("Content-Type", "multipart/form-data; boundary=" + boundary)
            .POST(HttpRequest.BodyPublishers.ofFile(audioPath))
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        System.out.println(response.body());
    }
}`,
  },
];
