import React from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import CodeEditor from 'components/CodeEditor';
import { updateCollectionRequestScript, updateCollectionResponseScript } from 'providers/ReduxStore/slices/collections';
import { saveCollectionRoot } from 'providers/ReduxStore/slices/collections/actions';
import { useTheme } from 'providers/Theme';
import StyledWrapper from './StyledWrapper';

const Script = ({ collection }) => {
  const dispatch = useDispatch();
  const requestScript = get(collection, 'root.request.script.req', '');
  const responseScript = get(collection, 'root.request.script.res', '');

  const { storedTheme } = useTheme();

  const onRequestScriptEdit = (value) => {
    dispatch(
      updateCollectionRequestScript({
        script: value,
        collectionUid: collection.uid
      })
    );
  };

  const onResponseScriptEdit = (value) => {
    dispatch(
      updateCollectionResponseScript({
        script: value,
        collectionUid: collection.uid
      })
    );
  };

  const handleSave = () => {
    dispatch(saveCollectionRoot(collection.uid));
  };

  return (
    <StyledWrapper className="w-full flex flex-col">
      <div className="flex-1 mt-2">
        <div className="mb-1 title text-xs">Pre Request</div>
        <CodeEditor
          collection={collection}
          value={requestScript || ''}
          theme={storedTheme}
          onEdit={onRequestScriptEdit}
          mode="javascript"
          onSave={handleSave}
        />
      </div>
      <div className="flex-1 mt-6">
        <div className="mt-1 mb-1 title text-xs">Post Response</div>
        <CodeEditor
          collection={collection}
          value={responseScript || ''}
          theme={storedTheme}
          onEdit={onResponseScriptEdit}
          mode="javascript"
          onSave={handleSave}
        />
      </div>

      <div className="mt-12">
        <button type="submit" className="submit btn btn-sm btn-secondary" onClick={handleSave}>
          Save
        </button>
      </div>
    </StyledWrapper>
  );
};

export default Script;
