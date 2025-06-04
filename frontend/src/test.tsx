const onSubmit = async (data: SessionForm) => {
  try {
    // Generating QAs
    const AIResponse = await axios.post(
      `${SERVER_URL}/api/v1/ai/generate-questions`,
      {
        role: data.role,
        experience: data.experience,
        importantTopics: data.importantTopics,
        numberOfQuestions: 10,
      },
      { withCredentials: true }
    );

    console.log("generate questions response: ", AIResponse.data);

    const generatedQuestions = AIResponse.data.data;

    // Creating Session
    const sessionResponse = await axios.post(
      `${SERVER_URL}/api/v1/sessions`,
      data,
      { withCredentials: true }
    );

    console.log("session create response: ", sessionResponse.data);

    const sessionInfo = sessionResponse.data.data;

    // Inserting QAs in db
    const response = await axios.post(
      `${SERVER_URL}/api/v1/questions/${sessionInfo.id}`,
      { questions: generatedQuestions },
      { withCredentials: true }
    );
    if (response.data?.session.id) {
      navigate(`/prep/session/${response.data?.session.id}`);
    }

    reset();
    setShowDialog(false);
    onSuccess();
  } catch (error) {
    console.error("Error creating session:", error);
  }
};
