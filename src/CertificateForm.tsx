import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";

type FormData = {
  recipientName: string;
  certificateId: string;
  date: string;
  template: string;
};

export default function CertificateForm({ handleSubmit }: { handleSubmit: (data: FormData) => void }) {
  const { register, handleSubmit: handleSubmitForm, formState: { errors } } = useForm<FormData>();

  const replacePlaceholders = (template: string, values: Record<string, string>) => {
    return Object.keys(values).reduce((acc, key) => {
      const placeholder = `{{${key}}}`;
      return acc.replace(new RegExp(placeholder, 'g'), values[key]);
    }, template);
  };
  const onSubmit = (data: FormData) => {
    console.log("Form Data: ", data);
    const { template, recipientName, certificateId, date } = data;

    const finalMessage = replacePlaceholders(template, { recipientName, certificateId, date });

    handleSubmit({...data, template: finalMessage});
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" component="h1" gutterBottom>
        Certificate Form
      </Typography>
      <form onSubmit={handleSubmitForm(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Recipient Name */}
          <TextField
            fullWidth
            id="recipientName"
            label="Recipient Name"
            variant="outlined"
            {...register("recipientName", { required: "Recipient name is required" })}
            error={!!errors.recipientName}
            helperText={errors.recipientName?.message}
          />

          {/* Certificate ID */}
          <TextField
            fullWidth
            id="certificateId"
            label="Certificate ID"
            variant="outlined"
            {...register("certificateId", { required: "Certificate ID is required" })}
            error={!!errors.certificateId}
            helperText={errors.certificateId?.message}
          />

          {/* Date */}
          <TextField
            fullWidth
            id="date"
            type="date"
            label="Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("date", { required: "Date is required" })}
            error={!!errors.date}
            helperText={errors.date?.message}
          />

          {/* Template Text Area */}
          <TextField
            fullWidth
            id="template"
            label="Certificate Template"
            variant="outlined"
            multiline
            rows={8} // Number of visible text lines
            {...register("template", { required: "Template is required" })}
            error={!!errors.template}
            helperText={errors.template?.message}
            placeholder={"{{recipientName}} has successfully completed the 4-Week AI Internship Program at Tublian, demonstrating exceptional dedication and a commendable work ethic throughout the internship. The contributions made, including the development of an advanced chatbot, have added significant value to the AI community."}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Preview
          </Button>
        </Box>
      </form>
    </Container>
  );
}
