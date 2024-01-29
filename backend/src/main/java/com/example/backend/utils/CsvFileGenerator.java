package com.example.backend.utils;

import java.io.IOException;
import java.io.Writer;
import java.util.List;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Component;
import com.example.backend.model.Company;

@Component
public class CsvFileGenerator {
    public void writeCompaniesToCsv(List<Company> companies, Writer writer) {
        try {

            CSVPrinter printer = new CSVPrinter(writer, CSVFormat.DEFAULT);
            for (Company company : companies) {
                printer.printRecord(company.getCompanyId(), company.getCompanyName());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}