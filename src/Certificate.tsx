import React, { useRef, useState } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import html2pdf from "html2pdf.js";
import CertificateForm from "./CertificateForm";

const styles = {
  contentContainer: {
    border: "3.5px solid #FD642E",
    borderRadius: 4,
    padding: "20px 30px",
    display: "grid",
    gridTemplateRow: "1fr 2fr 1fr",
    position: "relative",
  },
  headerContainer: {
    minHeight: { md: "80px" },
    display: "flex",
    alignItems: "flex-start",
    position: "absolute",
    zIndex: -1,
    left: { md: 14 },
    top: { md: 3 },
  },
};

type FormData = {
  recipientName: string;
  certificateId: string;
  date: string;
  template: string;
};

const Logo = styled("img")({
  width: 60,
});

const CertificateHeader = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  position: "absolute",
  zIndex: -1,
});

const Content = styled(Box)({
  marginBottom: 24,
  minHeight: "100px",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  width: "80%",
});

const Signature = styled("img")({
  width: "100px",
});

const BackgroundLogo = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "80%",
  backgroundImage: 'url("src/assets/logo.png")',
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  opacity: 0.14,
});

const FooterSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginTop: "10px",
});

export function Component({
  recipientName,
  certificateId,
  date,
  template,
}: FormData) {
  template =
    template ||
    `${recipientName || ""} successfully completed the 4-Week AI Internship
              Program at Tublian, demonstrating exceptional dedication and a
              commendable work ethic throughout the internship. The
             data contributions made, including the development of an advanced
              chatbot, have added significant value to the AI community.`;

  return (
    <Card
      sx={{
        margin: "auto",
        padding: "20px 30px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <BackgroundLogo />
      <CardContent sx={styles.contentContainer}>
        <CertificateHeader
          sx={{ minHeight: { md: "80px" }, left: { md: 14 }, top: { md: 3 } }}
        >
          <Logo
            src="src/assets/logo.png"
            alt="Tublian Logo"
            sx={{ zIndex: 2 }}
          />
          <Typography
            sx={{
              color: "#FD642E",
              marginTop: "10px",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "19.4px" }, // Responsive font size
              letterSpacing: "5px",
            }}
          >
            TUBLIAN
          </Typography>
        </CertificateHeader>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginTop: { md: "80px", sm: "60px", xs: "60px" },
          }}
        >
          <Box
            sx={{
              minHeight: {
                xs: "100px",
                sm: "100px",
                md: "180px",
              },
              flex: 1,
            }}
          >
            <Typography
              align="left"
              fontSize={{ xs: "30px", sm: "42.6px" }}
              fontWeight={700}
              fontFamily={"Inter"}
            >
              CERTIFICATE
            </Typography>
            <Typography
              align="left"
              fontFamily={"Poppins"}
              fontWeight={500}
              fontSize={{ xs: "18px", sm: "21.3px" }}
              color="#FC3946"
              lineHeight={"31.95px"}
              sx={{ letterSpacing: "5px" }}
            >
              OF INTERNSHIP
            </Typography>
          </Box>
          <Content>
            <Box
              sx={{
                borderBottom: "2px solid #FD642E",
                fontSize: { xs: "18px", sm: "24px" },
                fontWeight: 800,
              }}
            >
              {recipientName}
            </Box>
            <Box textAlign={"left"}>{template}</Box>
          </Content>
        </Box>
        <FooterSection>
          <Box sx={{ display: { sm: "none", xs: "none", md: "block" } }}></Box>
          <Box>
            <Signature src="src/assets/sign.png" alt="Signature" />
            <Typography
              fontSize={{ xs: "10px", sm: "11.9px" }}
              fontFamily={"Open Sans"}
              fontWeight={800}
            >
              Nilanjan Raychaudhuri
            </Typography>
            <Typography
              fontFamily={"Open Sans"}
              fontSize={{ xs: "8px", sm: "9.9px" }}
              fontWeight={700}
            >
              Founder - Tublian
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              src="src/assets/certificate1.png"
              alt="Certified Stamp"
              sx={{
                height: "60px",
                width: "60px",
                marginTop: "-5px",
                fill: "#FD642E",
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent={"flex-end"}
            >
              <Typography
                color="#FD642E"
                fontWeight={"700"}
                fontFamily={"Poppins"}
                fontSize={{ xs: "12px", sm: "14.9px" }}
              >
                CERTIFIED
              </Typography>
              <Typography
                fontSize={{ xs: "10px", sm: "11.9px" }}
                fontFamily={"Open Sans"}
                fontWeight={800}
                textAlign={"left"}
              >
                {certificateId}
              </Typography>
              <Typography
                fontSize={{ xs: "10px", sm: "11.9px" }}
                fontFamily={"Open Sans"}
                fontWeight={800}
                textAlign={"left"}
              >
                {date}
              </Typography>
            </Box>
          </Box>
        </FooterSection>
      </CardContent>
    </Card>
  );
}

export default function CertificateGeneration() {
  const [form, setForm] = useState<FormData | null>({
    recipientName: "[Recipient Name]",
    certificateId: "12345567",
    date: "12/25/2024",
  } as FormData);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const element = contentRef.current;
    if (element) {
      html2pdf()
        .from(element)
        .set({
          margin: [1, 0],
          filename: "certificate.pdf",
          html2canvas: { scale: 4 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  function handleSubmit(data: FormData) {
    setForm(data);
  }

  return (
    <>
      <Box
        sx={{
          color: "#FD642E",
          margin: 0,
          padding: 2,
          marginBottom: "50px",
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "24px",
          fontWeight: 800,
          width: "100%",
        }}
      >
        Certificate Generation
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 2,
          margin: "auto",
          gap: 5,
        }}
      >
        {form && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
              borderRadius: 1,
              padding: 2,
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <Box ref={contentRef}>
              <Component
                recipientName={form?.recipientName}
                certificateId={form?.certificateId}
                date={form?.date}
                template={form?.template}
              />
            </Box>
            <Button
              onClick={handleDownload}
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              Download PDF
            </Button>
          </Box>
        )}

        <Box sx={{ flex: 1 }}>
          <Card>
            <CertificateForm handleSubmit={handleSubmit} />
            <Box sx={{ padding: 2 }}>
              Instructions:
              <ul>
                <li>
                  <Typography
                    fontSize={{ xs: "10px", sm: "11.9px" }}
                    fontFamily={"Open Sans"}
                    fontWeight={800}
                  >
                    1. Enter the recipient name, certificate ID, date and
                    template in the form.
                  </Typography>
                </li>
                <li>
                  <Typography
                    fontSize={{ xs: "10px", sm: "11.9px" }}
                    fontFamily={"Open Sans"}
                    fontWeight={800}
                  >
                    2. Click on "Preview" to generate the certificate .
                  </Typography>
                </li>
                <li>
                  <Typography
                    fontSize={{ xs: "10px", sm: "11.9px" }}
                    fontFamily={"Open Sans"}
                    fontWeight={800}
                  >
                    3. Click on "Download PDF" to download the certificate in
                    PDF format.
                  </Typography>
                </li>
              </ul>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}
