
import * as XLSX from "xlsx";
import React, { useState, FormEvent} from 'react';
export const UploadExcel:React.FC = () => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);

    const handleFile = (e: any) => {
        const fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        const selectedFile = e.target.files?.[0];
        if (selectedFile && fileTypes.includes(selectedFile.type)){
            setTypeError(null);
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (e: any) => {
                setExcelFile(e.target.result)
            }
        }
        else {
            setTypeError('please select your file');
            setExcelFile(null);
        }
    };

    const handleFIleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (excelFile!==null){
            const workbook = XLSX.read(excelFile, {type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
        }
    }

    return (
        <>
        <form onSubmit={handleFIleSubmit}>
            <input type="file" onChange={handleFile}></input>
            <button type="submit">Submit</button>
        </form>
        
        </>
    )

}