import { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";

import { ejectEventValue, throwErrorToast } from "core/lib";
import cn from "classnames";

const REPO_REGEX = /github\.com\/[a-zA-Z-]+\/[a-zA-Z-]+/;

export type GithubRepoSearchProps = {
  disabled?: boolean;
  className?: string;
  defaultURL?: string | null;
  onClickLoad?: (url: string, owner: string, repo: string) => void;
};

export const GithubRepoSearch: React.VFC<GithubRepoSearchProps> = ({
  defaultURL,
  disabled,
  className,
  onClickLoad,
}) => {
  const [url, setUrl] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!onClickLoad) return;

    const match = REPO_REGEX.exec(url);
    if (!match) return throwErrorToast({ title: "URL should contains repository path!" });

    const [, owner, repo] = match[0].split("/");
    onClickLoad(url, owner, repo);
  };

  useEffect(() => {
    if (typeof defaultURL === "string") {
      setUrl(defaultURL);
      setTimeout(() => buttonRef.current?.click(), 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={onClick} className={cn("d-flex gap-3", className)}>
      <InputGroup size="lg">
        <Form.Control
          disabled={disabled}
          value={url}
          placeholder="Repo URL"
          onChange={ejectEventValue(setUrl)}
        />
      </InputGroup>
      <Button
        ref={buttonRef}
        type="submit"
        disabled={disabled}
        variant="primary"
        className="text-nowrap"
        children="Load Issues"
      />
    </form>
  );
};
