import { exec } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Converts a video file to MP4 format using ffmpeg.
 * 
 * @param {string} inputFilePath Path to the input video file.
 * @param {string} outputFilePath Path where the converted MP4 file will be saved.
 */
function convertToMp4(inputFilePath, outputFilePath) {
  // Ensure the input file exists
  if (!existsSync(inputFilePath)) {
    console.error('Input file does not exist:', inputFilePath);
    return;
  }

  // Prepare the ffmpeg command
  const command = `ffmpeg -i "${inputFilePath}" -c:v libx264 -preset fast -c:a aac "${outputFilePath}"`;

  // Execute the ffmpeg command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during conversion: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`ffmpeg stderr: ${stderr}`);
    }
    console.log('Conversion finished:', outputFilePath);
  });
}

// Check and create the output directory
const outputDirectory = join(process.cwd(), 'output'); // Output directory
if (!existsSync(outputDirectory)) {
  mkdirSync(outputDirectory, { recursive: true });
  console.log(`Output directory created at: ${outputDirectory}`);
}

// Adjust the input file path and output file path according to your requirements
const inputFilePath = "C:\\Users\\vedant\\Desktop\\downloaded_file"; // Input file path without an extension
const outputFileName = "convertedVideo.mp4"; // Desired output file name
const outputFilePath = join(outputDirectory, outputFileName); // Full output file path

// Start the conversion
convertToMp4(inputFilePath, outputFilePath);
