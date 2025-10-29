"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useApp } from "@/lib/context/app-context";

export default function UploadPosData() {
  const { replaceAllMenuItems } = useApp();
  const [posSystem, setPosSystem] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const allowedExtensions = [".csv", ".xls", ".xlsx"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      return "Please select a CSV or Excel file (.csv, .xls, .xlsx)";
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      return "File size must be less than 10MB";
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      setErrorMessage(error);
      setUploadStatus("error");
      return;
    }

    setSelectedFile(file);
    setErrorMessage("");
    setUploadStatus("idle");
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage("");
    setUploadStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleProcessData = async () => {
    if (!selectedFile || !posSystem) return;

    setUploadStatus("uploading");
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Read file content
      const fileContent = await selectedFile.text();

      // Determine format
      const format = selectedFile.name.toLowerCase().endsWith(".csv")
        ? "csv"
        : "text";

      // Call AI API to analyze the POS data
      const response = await fetch("/api/menu/analyze-pos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: fileContent,
          format: format,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process file");
      }

      const result = await response.json();

      // Replace all menu items with the uploaded data
      const itemsToAdd = result.menuItems.map((item: any) => ({
        name: item.name,
        category: item.category,
        cost: item.cost,
        price: item.price,
        salesCount: item.salesCount,
      }));
      
      replaceAllMenuItems(itemsToAdd);

      setUploadStatus("success");
      
      // Show success message with item count
      const itemCount = result.menuItems.length;
      const summaryText = result.summary || `Successfully imported ${itemCount} menu items!`;
      
      setSuccessMessage(
        `${summaryText}\n\nAll dashboard statistics, charts, and analytics have been updated with your uploaded data. Navigate to the Dashboard or Analytics pages to see your real data.\n\nYour data is now saved and will persist even after page reloads.`
      );

      // Reset form after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        setPosSystem("");
        setUploadStatus("idle");
        setSuccessMessage("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
    } catch (error) {
      console.error("Error processing file:", error);
      setUploadStatus("error");
      setErrorMessage(
        "Failed to process file. Please ensure it contains valid menu data."
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload POS Data</CardTitle>
        <CardDescription>
          Import your sales data from your Point of Sale system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pos-system">POS System</Label>
          <Select value={posSystem} onValueChange={setPosSystem}>
            <SelectTrigger id="pos-system">
              <SelectValue placeholder="Select your POS system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="toast">Toast</SelectItem>
              <SelectItem value="clover">Clover</SelectItem>
              <SelectItem value="lightspeed">Lightspeed</SelectItem>
              <SelectItem value="other">Other / CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* File upload area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragOver
              ? "border-primary bg-primary/5"
              : selectedFile
              ? "border-green-500 bg-green-50"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleChooseFileClick}
        >
          <div className="flex flex-col items-center space-y-3">
            {selectedFile ? (
              <>
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove File
                </Button>
              </>
            ) : (
              <>
                <div className="bg-primary/10 p-4 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Drag and drop your file here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    or click to browse
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Success message */}
        {uploadStatus === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {successMessage ||
                "File processed successfully! Your menu data has been updated."}
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-medium">Supported Formats</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>CSV files from your POS system export</li>
            <li>Excel files (.xlsx, .xls)</li>
            <li>Required columns: Item Name, Price, Cost, Sales Count</li>
            <li>Optional: Category, Date Range</li>
          </ul>
        </div>

        <Button
          className="w-full"
          disabled={!posSystem || !selectedFile || uploadStatus === "uploading"}
          onClick={handleProcessData}
        >
          {uploadStatus === "uploading" ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : uploadStatus === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Processed Successfully
            </>
          ) : (
            "Process Data"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
