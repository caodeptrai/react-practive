import { Alert } from "react-bootstrap"


const Error404 = () => {
  return (
    <>

      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          OOPS!page not found !!
        </p>
      </Alert>
    </>
  )
}

export default Error404