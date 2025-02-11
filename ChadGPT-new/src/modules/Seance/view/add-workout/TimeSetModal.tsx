import { SeanceFormModal } from "#modules/Seance/view/addSeance/SeanceFormModal";
import {
  SaveButton,
  StopButton,
} from "#modules/Seance/view/addSeance/SerieCard/SeanceModalButtons";
import {
  RestTabItem,
  TimeSelectionTabs,
} from "#modules/Seance/view/addSeance/SerieCard/TimeSelection/TimeSelectionTabs";
import {
  Chrono,
  useChrono,
} from "#modules/Seance/view/addSeance/SerieCard/TimeSelection/useChrono";
import { TimeSelection } from "#modules/Seance/view/addSeance/SerieCard/TimeSelection/TimeSelection";
import { Spacer } from "#shared/view/components/Spacer";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { TimeSet } from "#modules/Seance/domain/serie.types";

const addMissingZeros = (number: number | string) => {
  return Number(number) < 10 ? `0${number}` : number;
};

export type RestInputType = "CHRONO" | "MANUAL";

type TimeSelectionModalProps = {
  title: string;
  closeModal: () => void;
  isModalVisible: boolean;
  onConfirm: (set: TimeSet) => void;
  rest: (set: TimeSet) => void;
  hideRest?: boolean;
};

export const TimeSetModal = ({
  closeModal,
  title,
  isModalVisible,
  onConfirm,
  rest,
  hideRest,
}: TimeSelectionModalProps) => {
  const [restInputType, setRestInputType] = useState<RestInputType>("CHRONO");
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const chrono = useChrono(setTimeInSeconds);

  const tabItems: RestTabItem[] = [
    { label: "Chrono", value: "CHRONO" },
    { label: "Manuel", value: "MANUAL" },
  ];

  const setToSave: TimeSet = {
    id: "",
    temps: timeInSeconds,
    perfId: "",
    repos: 0,
    type: "TEMPS",
  };

  const clearModal = () => {
    closeModal();
    chrono.reset();
  };

  return (
    <SeanceFormModal
      title={title}
      closeModal={clearModal}
      isModalVisible={isModalVisible}
      style={{ minWidth: 40 }}
    >
      <TimeSelectionTabs
        tabsItems={[
          { label: "Chrono", value: "CHRONO" },
          { label: "Manuel", value: "MANUAL" },
        ]}
        onTabPress={(tab) => setRestInputType(tab.value)}
        selectedTab={tabItems.find((tab) => tab.value === restInputType)!}
      />
      <ContentContainer>
        {restInputType === "CHRONO" && (
          <ChronoSection
            hideRest={hideRest}
            onFinishExercise={() => {
              onConfirm(setToSave);
              clearModal();
            }}
            chrono={chrono}
            onSavePress={() => {
              rest(setToSave);
              clearModal();
            }}
            timeInSeconds={timeInSeconds}
            setTimeInSeconds={setTimeInSeconds}
          />
        )}

        {restInputType === "MANUAL" && (
          <TimeSelection
            onSavePress={() => {
              onConfirm(setToSave);
              closeModal();
            }}
          />
        )}
      </ContentContainer>
    </SeanceFormModal>
  );
};

const ContentContainer = styled.View({
  padding: 16,
});

const TimeDisplayer = ({ timeInSeconds }: { timeInSeconds: number }) => {
  const theme = useTheme();
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        key={timeInSeconds}
        style={{
          fontFamily: "Digital7",
          color: theme.colors.black,
          fontSize: 60,
          lineHeight: 60 * 1.2,
        }}
      >
        {`${addMissingZeros(minutes)}:${addMissingZeros(seconds.toFixed(1))}`}
      </Text>
    </View>
  );
};

type ChronoSectionProps = {
  onSavePress: (timeInSeconds: number) => void;
  timeInSeconds: number;
  setTimeInSeconds: (
    timeInSeconds: number | ((previousTime: number) => number)
  ) => void;
  chrono: Chrono;
  onFinishExercise: () => void;
  hideRest?: boolean;
};

const ChronoSection = ({
  onSavePress,
  setTimeInSeconds,
  timeInSeconds,
  hideRest,
  onFinishExercise,
  chrono,
}: ChronoSectionProps) => {
  const { t } = useTranslation("workouts");
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;

    if (chrono.isRunning) {
      interval = setInterval(() => {
        setTimeInSeconds(chrono.getEllapsedTime(chrono.beginningTime));
      }, 100);
    } else if (!chrono.isRunning && timeInSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [chrono, chrono.isRunning, setTimeInSeconds, timeInSeconds]);

  return (
    <GestureHandlerRootView style={{ alignItems: "center" }}>
      <TapGestureHandler
        numberOfTaps={2}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            if (chrono.pauseBeginningTime) {
              chrono.reset();
            }
          }
        }}
      >
        <ChronoContainer>
          <TimeDisplayer timeInSeconds={timeInSeconds} />
          {!chrono.isRunning && timeInSeconds !== 0 ? (
            <Typography.TextM.regular
              color="black"
              style={{ alignSelf: "center" }}
            >
              {t("set.tapToReset")}
            </Typography.TextM.regular>
          ) : (
            <Typography.TextM.regular
              color="black"
              style={{ alignSelf: "center" }}
            >
              {" "}
            </Typography.TextM.regular>
          )}

          <Spacer.Vertical gap={16} />

          <RowContainer>
            <View>
              <StopButton
                label={
                  timeInSeconds === 0 && !chrono.isRunning
                    ? t("newAddWorkout.start")
                    : undefined
                }
                isChronoRunning={chrono.isRunning}
                onPress={() => {
                  if (chrono.isRunning) {
                    chrono.pause();
                    return;
                  }
                  if (chrono.pauseBeginningTime) {
                    chrono.resume(
                      chrono.beginningTime,
                      chrono.pauseBeginningTime
                    );
                    return;
                  }
                  chrono.start();
                }}
              />
            </View>
            {timeInSeconds !== 0 && !hideRest && (
              <View>
                <SaveButton
                  label="Rest"
                  onPress={() => onSavePress(timeInSeconds)}
                  isDisabled={chrono.isRunning}
                />
              </View>
            )}
          </RowContainer>
          {!chrono.isRunning && timeInSeconds !== 0 && (
            <>
              <Spacer.Vertical gap={8} />
              <RowContainer>
                <StopButton
                  label={t("newAddWorkout.saveAndClose")}
                  onPress={onFinishExercise}
                />
              </RowContainer>
            </>
          )}
        </ChronoContainer>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

const ChronoContainer = styled.View({});

const RowContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  gap: 8,
});
