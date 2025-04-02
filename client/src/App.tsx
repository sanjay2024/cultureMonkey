import { JSX, useState } from "react";
import styles from "./app.module.css";

import { Form } from "./component/Form/Form";
import RenderWhen from "./common/HOC/RenderWhen";
import Card from "./component/Card/Card";
import { FormData } from "./types/profile";

const App = (): JSX.Element => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    setSubmittedData(data);
  };

  return (
    <>
      <div className={styles.container}>
        <Form onSubmit={handleSubmit} />
        <RenderWhen isTrue={Boolean(submittedData)}>
          <Card data={submittedData as FormData} />
        </RenderWhen>
      </div>
    </>
  );
};

export default App;
