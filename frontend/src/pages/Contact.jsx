import { useContext, useState } from "react";
import {
  Button,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  FormFeedback,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { LanguageContext } from "@src/App";
import NavBar from "@components/Navbar";
import Header from "@components/Header";
import ContentWrapper from "@components/ContentWrapper";
import { translation } from "@utils/Helpers";
import { handledRequestStatuses, contactFormURL } from "@utils/Constants";
import SEO from "@utils/SEO";
import Breadcrumbs from "@utils/Breadcrumbs";
import "@styles/contact.css";

function Contact() {
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  const { language } = useContext(LanguageContext);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [formBeingSubmitted, setFormBeingSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    message: false,
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]:
        value.trim() === "" || (name === "email" && !validateEmail(value)),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormBeingSubmitted(true);
    setRequestStatus(null);

    const newErrors = {
      fullName: form.fullName.trim() === "",
      email: !validateEmail(form.email),
      message: form.message.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      setFormBeingSubmitted(false);
      return;
    }

    try {
      const response = await fetch(contactFormURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setCaptchaSolved(false);
        setForm({ fullName: "", email: "", message: "" });
      }
      handledRequestStatuses.includes(response.status)
        ? setRequestStatus(response.status)
        : setRequestStatus(0);
    } catch (error) {
      console.error("Network error:", error);
      setRequestStatus(0);
    } finally {
      setFormBeingSubmitted(false);
    }
  };

  const pageTitle = translation(language, "transl.contact.title");
  const emailAddress = translation(language, "transl.contact.email.address");

  return (
    <>
      <SEO
        title={`${pageTitle} - Taxidermy Poland | Get in Touch`}
        description={`Contact Taxidermy Poland for inquiries about our taxidermy specimens. Email us at ${emailAddress} or use our contact form.`}
        path="/contact"
        language={language}
      />
      <Breadcrumbs language={language} />
      <NavBar expand="lg" dark />
      <Header />
      <ContentWrapper>
        <h3 className="mb-4 text-center fw-bold">{pageTitle}</h3>
        <Container className="px-5">
          {!formSubmitted ? (
            <>
              <div className="mb-4">
                <span>
                  {translation(language, "transl.contact.write.to.me")}
                </span>
                <a
                  className="fw-bold"
                  href={`mailto:${emailAddress}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {emailAddress}
                </a>
                <span>
                  {translation(language, "transl.contact.write.to.me.2")}
                </span>
              </div>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label className="fw-bold" for="fullName">
                    {translation(language, "transl.contact.full.name.label")}
                  </Label>
                  <Input
                    className="contact-input"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder={translation(
                      language,
                      "transl.contact.full.name.placeholder"
                    )}
                    value={form.fullName}
                    onChange={handleChange}
                    invalid={errors.fullName}
                  />
                  {errors.fullName && (
                    <FormFeedback>
                      {translation(
                        language,
                        "transl.contact.full.name.required"
                      )}
                    </FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="fw-bold" for="email">
                    {translation(language, "transl.contact.email.label")}
                  </Label>
                  <Input
                    className="contact-input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={translation(
                      language,
                      "transl.contact.email.placeholder"
                    )}
                    value={form.email}
                    onChange={handleChange}
                    invalid={errors.email}
                  />
                  {errors.email && (
                    <FormFeedback>
                      {translation(language, "transl.contact.email.required")}
                    </FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="fw-bold" for="message">
                    {translation(language, "transl.contact.message.label")}
                  </Label>
                  <Input
                    className="contact-input"
                    type="textarea"
                    name="message"
                    id="message"
                    placeholder={translation(
                      language,
                      "transl.contact.message.placeholder"
                    )}
                    value={form.message}
                    onChange={handleChange}
                    invalid={errors.message}
                  />
                  {errors.message && (
                    <FormFeedback>
                      {translation(language, "transl.contact.message.required")}
                    </FormFeedback>
                  )}
                </FormGroup>
                <div className="submit-section mt-4">
                  <ReCAPTCHA
                    sitekey={recaptchaKey}
                    onChange={() => setCaptchaSolved(true)}
                    onExpired={() => setCaptchaSolved(false)}
                    onErrored={() => setCaptchaSolved(false)}
                  />
                  <div>
                    <Button
                      className="mt-2"
                      color="success"
                      type="submit"
                      disabled={!captchaSolved}
                    >
                      {formBeingSubmitted ? (
                        <>
                          <Spinner size="sm" />{" "}
                          {translation(
                            language,
                            "transl.contact.sending.message.button"
                          )}
                        </>
                      ) : (
                        translation(
                          language,
                          "transl.contact.send.message.button"
                        )
                      )}
                    </Button>
                  </div>
                </div>
              </Form>
              {requestStatus !== 200 && requestStatus !== null && (
                <div className="form-submit-status-message pt-3 fs-6 fw-bold text-danger">
                  {translation(
                    language,
                    `transl.contact.message.status.${requestStatus}`
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="form-submit-status-message pt-3 fs-5 fw-bold text-success">
              {translation(
                language,
                `transl.contact.message.status.${requestStatus}`
              )}
            </div>
          )}
        </Container>
      </ContentWrapper>
    </>
  );
}

export default Contact;
