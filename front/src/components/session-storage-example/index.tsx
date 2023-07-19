import { memo } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import styles from "./style.module.scss";
import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { SessionStorageService } from "@/utils/session-storage";

const initialValues = {
  name: "",
  email: "",
};

const saveFormValues = debounce((values) => {
  SessionStorageService.setItem("formValues", JSON.stringify(values));
}, 300);

const getSavedFormValues = () => {
  const savedValues = SessionStorageService.getItem("formValues");
  if (savedValues) {
    return JSON.parse(savedValues);
  }
  return null;
};

const FormAutoSave = memo(() => {
  const { values, setValues, touched } = useFormikContext();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const savedValues = getSavedFormValues();
      if (savedValues) {
        setValues(savedValues);
      }
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    touched && saveFormValues(values);
  }, [values, touched]);

  return null;
});

export const SessionStorageExample = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => alert(JSON.stringify(values))}
    >
      {() => (
        <Form className={styles["form"]}>
          <FormAutoSave />
          <div className={styles["form-group"]}>
            <label>Name</label>
            <Field name="name" />
          </div>
          <div className={styles["form-group"]}>
            <label>Email</label>
            <Field name="email" type="email" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
