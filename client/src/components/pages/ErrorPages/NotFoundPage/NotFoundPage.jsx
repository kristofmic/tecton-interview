import React from 'react';

import Gate from '../../../common/Gate';

function NotFoundPage() {
  return (
    <Gate
      heading="This content doesn't exist"
      message="We're not sure how you got here, but don't worry, there's a way out 😅"
      primaryLinkText="Take me out of here"
      primaryLinkTo="/"
    />
  );
}

export default NotFoundPage;
