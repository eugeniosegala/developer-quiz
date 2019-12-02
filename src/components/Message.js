import React from 'react';

import { success, failure } from '../messages';
import { getRandomNumBetween } from '../helpers/random';

const Message = React.memo(({ status }) => {
  return (
      <div className={status === 1 ? "message message--state-success" : "message message--state-failure"}>
        {status === 1 ?
          <span>{success[getRandomNumBetween(0, 10)]}</span>
          :
          <span>{failure[getRandomNumBetween(0, 5)]}</span>
        }
      </div>
  );
});

export default Message;
