import { Injectable } from "@nestjs/common";
import { BlockBlobClient, BlobServiceClient } from "@azure/storage-blob";

@Injectable()
export class FileUploader {

    azureConnection = "DefaultEndpointsProtocol=https;AccountName=tikkablob;AccountKey=CoUnylZFddx1LmycU02N6WFB5ulQcYggdHVWZTh9WRPuwVjtdzoYfoXSuLXQzS/5e5Fsjwh8GSOn+ASt7Mr1jA==;EndpointSuffix=core.windows.net";
    container = "mana-panchayat";


    private getBlockBlobClient(filename): BlockBlobClient {
        const blobServiceClient = BlobServiceClient.fromConnectionString(this.azureConnection);
        const blobContainer = blobServiceClient.getContainerClient(this.container);
        return blobContainer.getBlockBlobClient(filename)
    }

    async uploadFile(file: Express.Multer.File) {
        const blockBlobClient = this.getBlockBlobClient(file.originalname);
        await blockBlobClient.uploadData(file.buffer);
        return blockBlobClient.url;
    }

    generateSasUrl(file: string): any {
        const blockBlobClient = this.getBlockBlobClient(file);
        return blockBlobClient.url;
    }

}