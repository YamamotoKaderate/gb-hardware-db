import * as React from 'react';
import * as R from 'ramda';

import {Photo, CgbSubmission} from '../../crawler';
import {CgbMetadata} from '../../metadata';
import * as format from '../format';
import ConsolePageChip from '../components/ConsolePageChip';
import ConsolePageChipTable from '../components/ConsolePageChipTable';

export default function CgbConsole({submission}: {submission: CgbSubmission}) {
  return (
    <article className="page-console page-console--cgb">
      <h2>{`CGB: ${submission.title} [${submission.contributor}]`}</h2>
      <div className="page-console__photo">
        {renderPhoto(submission, submission.photos.front)}
        {renderPhoto(submission, submission.photos.back)}
      </div>
      <dl>
        <dt>Color</dt>
        <dd>{format.optional<string>(R.identity, submission.metadata.color)}</dd>
        <dt>Assembly date</dt>
        <dd>{format.calendar(submission.metadata)}</dd>
      </dl>
      <h3>Mainboard</h3>
      <div className="page-console__photo">
        {renderPhoto(submission, submission.photos.pcbFront)}
        {renderPhoto(submission, submission.photos.pcbBack)}
      </div>
      <dl>
        <dt>Board type</dt>
        <dd>{submission.metadata.mainboard.type}</dd>
        <dt>Manufacture date</dt>
        <dd>{format.calendar(submission.metadata.mainboard)}</dd>
        <dt>Stamp</dt>
        <dd>{format.optional<string>(R.identity, submission.metadata.mainboard.stamp)}</dd>
        <dt>Circled letter(s) on board</dt>
        <dd>{format.optional<string>(R.identity, submission.metadata.mainboard.circled_letters)}</dd>
        <dt>Number pair on board</dt>
        <dd>{format.optional<string>(R.identity, submission.metadata.mainboard.number_pair)}</dd>
      </dl>
      <h3>Chips</h3>
      {renderChips(submission.metadata)}
    </article>
  )
}

function renderPhoto(submission: CgbSubmission, photo: Photo | undefined) {
  if (!photo) {
    return null;
  }
  const url = `/static/cgb/${submission.slug}_${photo.name}`
  return (
    <a href={url}>
      <img src={url} />
    </a>
  )
}

function renderChips({mainboard}: CgbMetadata) {
  return (
    <ConsolePageChipTable>
      <ConsolePageChip designator="U1" title="CPU" chip={mainboard.cpu} />
      <ConsolePageChip designator="U2" title="Work RAM" chip={mainboard.work_ram} />
      <ConsolePageChip designator="U3" title="Amplifier" chip={mainboard.amplifier} />
      <ConsolePageChip designator="U4" title="Regulator" chip={mainboard.regulator} />
      <ConsolePageChip designator="X1" title="Crystal" chip={mainboard.crystal} />
    </ConsolePageChipTable>
  )
}
