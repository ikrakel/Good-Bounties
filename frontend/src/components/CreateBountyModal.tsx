import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Slider,
  Textarea,
  useTheme,
} from "@mui/joy";
import { AModal } from "./Common/AModal";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Countries } from "../data/Countries";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { DatePicker } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useDropzone } from "react-dropzone";
import { Clickable } from "./css/Button";

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateBountyModal: FC<Props> = ({ createModalOpen, setCreateModalOpen }) => {
  const { signer, provider, walletBalance } = useWeb3Auth();
  const theme = useTheme();

  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rewardAmount, setRewardAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(addDays(new Date(), 7));
  const [criterias, setCriterias] = useState([""]);
  const [image, setImage] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const imageUri = useMemo(() => {
    if (image) return URL.createObjectURL(image);
  }, [image]);

  const step1 = () => {
    return (
      <Flex y gap3>
        <Flex x gap2>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="soft"
            placeholder="Title"
          />
        </Flex>
        {/* <Flex x gap2>
          <Input sx={{ width: "50%" }} variant="soft" placeholder="Reward amount" />
        </Flex> */}
        <Textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={4}
          variant="soft"
          placeholder="Bounty description"
        />

        {image ? (
          <Flex
            onClick={() => setImage(undefined)}
            sx={{
              // ...Clickable,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${imageUri})`,
              height: "250px",
            }}
          ></Flex>
        ) : (
          <Flex
            component={Card}
            x
            yc
            xc
            {...getRootProps()}
            sx={{ ...Clickable, backgroundColor: theme.palette.primary.softBg, height: "100px" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Flex>
        )}
      </Flex>
    );
  };

  const step2 = () => {
    return (
      <Flex y gap3>
        <Flex x gap2>
          <Autocomplete
            sx={{ width: "50%" }}
            variant="soft"
            placeholder="Location"
            value={location}
            onChange={(e, val) => val && setLocation(val)}
            options={Countries.map((country) => country.name)}
            disableClearable
          />
          <DatePicker
            sx={{ width: "50%" }}
            label="Deadline"
            value={deadline}
            onChange={(newValue) => {
              setDeadline(newValue || undefined);
            }}
            slots={{
              textField: (props) => {
                //@ts-ignore
                return <Input {...props} variant="soft" />;
              },
            }}
          />
        </Flex>
        <Flex y gap1>
          <Text>Acceptance Criteria</Text>
          {criterias.map((x, i) => (
            <Flex key={i} x yc>
              <Input
                onChange={(e) => setCriterias(criterias.map((x2, i2) => (i2 === i ? e.target.value : x2)))}
                value={x}
                fullWidth
                variant="soft"
                placeholder={"Critera " + (i + 1)}
              />
              <IconButton
                onClick={() => {
                  const newCriterias = [...criterias];
                  newCriterias.splice(i, 1);
                  setCriterias(newCriterias);
                }}
              >
                <Remove color="error" />
              </IconButton>
            </Flex>
          ))}
          <Button
            startDecorator={<Add />}
            sx={{ width: "fit-content" }}
            variant="soft"
            onClick={() => setCriterias([...criterias, ""])}
          >
            Add critera
          </Button>
        </Flex>
      </Flex>
    );
  };

  const step3 = () => {
    return (
      <Flex y gap3>
        <Text>Donation</Text>
        <Flex y>
          <Text type="caption">
            {((rewardAmount / 100) * Number(walletBalance)).toLocaleString("en-us", { maximumSignificantDigits: 4 })}{" "}
            MATIC
          </Text>
          <Slider
            onChange={(e, val) => !Array.isArray(val) && setRewardAmount(val)}
            value={rewardAmount}
            min={0}
            max={100}
            marks={[
              { value: 0, label: "0" },
              { value: 50, label: Number(walletBalance) / 2 },
              { value: 100, label: walletBalance },
            ]}
          />
        </Flex>
      </Flex>
    );
  };
  const steps = [() => step1(), () => step2(), () => step3()];

  const submit = () => {
    //TODO SUBMIT
    console.log("submit");
  };

  const back = () => {
    if (currentStep === 0) setCreateModalOpen(false);
    else setCurrentStep(currentStep - 1);
  };

  const next = () => {
    if (currentStep >= steps.length - 1) {
      submit();
    } else setCurrentStep(currentStep + 1);
  };

  return (
    <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
      <ModalDialog size="lg" variant="outlined">
        <Text type="header2">Create new bounty</Text>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ minWidth: "50vw", minHeight: "80px" }}>{steps[currentStep]()}</Box>
        <Divider sx={{ my: 2 }} />
        <Flex x yc xe gap2>
          <Button variant="soft" onClick={() => back()} sx={{ minWidth: "100px" }}>
            {currentStep === 0 ? "Cancel" : "Back"}
          </Button>
          <Button variant="soft" onClick={() => next()} sx={{ minWidth: "100px" }}>
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
