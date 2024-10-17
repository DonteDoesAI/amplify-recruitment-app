import React, { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { uploadData, list } from 'aws-amplify/storage';
import './App.css';

//const client = generateClient<Schema>();

function App() {
  const { signOut, user } = useAuthenticator();
  const [files, setFiles] = useState<{ [key: string]: string[] }>({
    resumesBucket: [],
    profilesBucket: [],
    jobReqsBucket: []
  });

  useEffect(() => {
    listFiles();
  }, []);

  async function listFiles() {
    try {
      const resumesFiles = await list({ options: { bucket: 'resumesBucket' } });
      const profilesFiles = await list({ options: { bucket: 'profilesBucket' } });
      const jobReqsFiles = await list({ options: { bucket: 'jobReqsBucket' } });

      setFiles({
        resumesBucket: resumesFiles.items.map(item => item.key),
        profilesBucket: profilesFiles.items.map(item => item.key),
        jobReqsBucket: jobReqsFiles.items.map(item => item.key)
      });
    } catch (error) {
      console.error('Error listing files:', error);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>, bucketName: string) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadPromises = Array.from(files).map(file => 
        uploadData({
          key: `private/${file.name}`,
          data: file,
          options: {
            bucket: bucketName,
            contentType: file.type
          }
        }).result
      );

      await Promise.all(uploadPromises);
      listFiles();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Neural Solutions Recruiting</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={signOut}>Sign out</button>
        </div>
      </header>
      <main className="app-main">
        <section className="upload-section">
          <h2>File Management</h2>
          <div className="bucket-container">
            <div className="bucket">
              <h3>Resumes</h3>
              <input type="file" multiple onChange={(e) => handleFileUpload(e, 'resumesBucket')} />
              <ul>
                {files.resumesBucket.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </div>
            <div className="bucket">
              <h3>Profiles</h3>
              <input type="file" multiple onChange={(e) => handleFileUpload(e, 'profilesBucket')} />
              <ul>
                {files.profilesBucket.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </div>
            <div className="bucket">
              <h3>Job Requirements</h3>
              <input type="file" multiple onChange={(e) => handleFileUpload(e, 'jobReqsBucket')} />
              <ul>
                {files.jobReqsBucket.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Neural Solutions Recruiting. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;