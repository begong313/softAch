import { Request, Response, NextFunction } from "express";

// multer-s3에서 사용되는 location이라는 속성을 추가합니다.
declare global {
    namespace Express {
        interface Request {
            file: {
                fieldname: string;
                originalname: string;
                encoding: string;
                mimetype: string;
                size: number;
                bucket: string;
                key: string;
                acl: string;
                contentType: string;
                contentDisposition: null;
                storageClass: string;
                serverSideEncryption: null;
                metadata: null;
                location: string; // 여기에 location을 추가합니다.
            };
        }
    }
}
