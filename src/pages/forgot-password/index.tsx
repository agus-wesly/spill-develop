import ForgotPassword from '@/component/pages/ForgotPassword'

export async function getServerSideProps() {
  // Fetch content data based on slug parameter
  const isReadyAccount = false

  if (isReadyAccount) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default ForgotPassword
