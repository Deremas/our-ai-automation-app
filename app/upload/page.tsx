"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ApiResult =
  | { success: true; message: string; chunksCreated: number }
  | { success: false; error: string };

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please choose a PDF file first." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile); // MUST be "pdf"

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = (await res.json()) as ApiResult;

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setSelectedFile(null);
        // reset input (optional): easiest way is to refresh key or manual DOM reset
      } else {
        setMessage({
          type: "error",
          text: result.error ?? "Failed to process PDF",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          PDF Upload
        </h1>

        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Upload PDF file</Label>
              <Input
                id="pdf-upload"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleSelectFile}
                disabled={isLoading}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected:{" "}
                  <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={isLoading || !selectedFile}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Upload & Process"
              )}
            </Button>

            {message && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
              >
                <AlertTitle>
                  {message.type === "error" ? "Error" : "Success!"}
                </AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// "use client"
// import React, { useState } from "react";
// import { processPdfFile } from "./actions";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Loader2 } from "lucide-react";
// import { string } from "zod/v4";

// export default function PDFUpload() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState<{
//     type: "error" | "success";
//     text: string;
//   } | null>(null);

//   const handleFileUPload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsLoading(true);
//     setMessage(null);

//     try {
//       const formData = new FormData();
//       formData.append("Pdf", file);

//       const result = await processPdfFile(formData);

//       if (result.success) {
//         setMessage({
//           type: "error",
//           text: result.message || "PDF processed successfully",
//         });
//         e.target.value = "";
//       } else {
//         setMessage({
//           type: "error",
//           text: result.error || "Failed to process PDF"
//         });
//       }
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: "AN error occured while processing a PDF",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-1 px-4 ">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//           PDF Upload
//         </h1>
//         <Card className="mb-6">
//           <CardContent className="pt-6">
//             <div className="space-y-4">
//               <Label htmlFor="pdf-upload">Upload PDF file</Label>
//               <Input
//                 id="pdf-upload"
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileUPload}
//                 disabled={isLoading}
//                 className="mt-2"
//               />
//             </div>
//             {isLoading && (
//               <div className="flex items-center gap-2 ">
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 <span className="text-muted-foreground">Processing PDF...</span>
//               </div>
//             )}
//             {message && (
//               <Alert
//                 variant={message.type === "error" ? "destructive" : "default"}
//               >
//                 <AlertTitle>
//                   {message.type === "error" ? "Error" : "Success!"}
//                 </AlertTitle>
//                 <AlertDescription>{message.text}</AlertDescription>
//               </Alert>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
