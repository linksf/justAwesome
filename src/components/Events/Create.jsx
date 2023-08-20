import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../../Utilities/colors";
import { Link, redirect } from "react-router-dom";
import ToolTip from "../../elements/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from "../../context/FirebaseContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import { UtilityContext } from "../../context/UtilityContext";
import {
  TextArea,
  FormWrapper,
  Form,
  Header,
  Input,
  Label,
  Button,
  Text,
  Span,
  Checkbox,
  Select,
  Option,
  Collection,
  Fieldset,
  Legend,
} from "../../elements/forms.js";
import genericImage1 from "../../images/games1.jpg";
import genericImage2 from "../../images/games2.jpg";
import genericImage3 from "../../images/games3.jpg";
import genericImage4 from "../../images/games4.jpg";
import genericImage5 from "../../images/games5.jpg";
import genericImage6 from "../../images/games6.png";
import genericImage7 from "../../images/games7.png";
import genericImage8 from "../../images/games8.png";
import genericImage9 from "../../images/games9.png";
import genericImage10 from "../../images/games10.png";

const Create = (props) => {
  const blankForm = {
    name: "",
    description: "",
    date: "",
    dateObject: {},
    startTime: "",
    endTime: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    RSVPLimit: 0,
    options: {
      isPublic: false,
      isRSVPRequired: false,
      isRSVPLimited: false,
      allowGameSignups: false,
      allowGameVoting: false,
      allowGameScheduling: false,
      allowGuestInvites: false,
    },
    attendees: [],
    games: [],
  };

  const {
    createEvent,
    uploadImageToStorage,
    getRandomGameImageUrl,
  } = useContext(FirebaseContext);
  const { setError, colors, activateToast, SEARCHSCOPES } = useContext(
    UtilityContext
  );
  const [formData, setFormData] = useState({ ...blankForm });
  const [imageFile, setImageFile] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl;
    const dateObject = convertDateStringToObject(formData.date);
    if (imageFile) {
      imageUrl = await uploadImageToStorage(imageFile, "events");
    } else {
      imageUrl = await getRandomGameImageUrl();
    }
    const eventData = {
      ...formData,
      dateObject: dateObject,
      image: imageUrl,
    };

    createEvent(eventData)
      .then((res) => {
        console.log(res);
        setFormData({ ...blankForm });
        return redirect(`/events`);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const convertDateStringToObject = (dateString) => {
    const [day, month, date, year, ...time] = new Date(dateString)
      .toString()
      .split(" ");
    return { day: day, month: month, date: date, year: year };
  };
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [e.target.name]: e.target.checked,
      },
    });
  };

  return (
    <Form
      border="2px solid white"
      onSubmit={handleSubmit}
      templatecolumns="repeat(8, minmax(0, 1fr))"
    >
      <Header column="1/9">Create a New Event</Header>
      <Label column="1/3" htmlFor="name">
        Event Name
      </Label>
      <Input
        required
        column="3/6"
        type="text"
        name="name"
        id="name"
        placeholder="Event Name"
        value={formData.name}
        onChange={handleChange}
      />
      <Label column="6/7" htmlFor="date">
        Date
      </Label>
      <Input
        required
        column="7/9"
        type="date"
        name="date"
        id="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
      />
      <Label column="1/3" htmlFor="description">
        Description
      </Label>
      <TextArea
        required
        width="900px"
        column="3/9"
        name="description"
        id="description"
        placeholder=""
        rows="4"
        cols="20"
        value={formData.description}
        onChange={handleChange}
      />

      <Label column="1/3" htmlFor="startTime">
        Start Time
      </Label>
      <Input
        required
        column="3/5"
        type="time"
        name="startTime"
        id="startTime"
        placeholder="Start Time"
        value={formData.startTime}
        onChange={handleChange}
      />
      <Label column="5/7" htmlFor="endTime">
        End Time
      </Label>
      <Input
        column="7/9"
        type="time"
        name="endTime"
        id="endTime"
        placeholder="End Time"
        value={formData.endTime}
        onChange={handleChange}
      />
      <Label column="1/2" htmlFor="street">
        Street
      </Label>
      <Input
        required
        column="2/9"
        type="text"
        name="street"
        id="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
      />
      <Label column="1/2" htmlFor="city">
        City
      </Label>
      <Input
        required
        column="2/4"
        type="text"
        name="city"
        id="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <Label column="4/5" htmlFor="state">
        State
      </Label>
      <Input
        required
        column="5/6"
        type="text"
        name="state"
        id="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />
      <Label column="6/7" htmlFor="zip">
        Zip
      </Label>
      <Input
        required
        column="7/9"
        type="text"
        name="zip"
        id="zip"
        placeholder="Zip"
        value={formData.zip}
        onChange={handleChange}
      />
      <Label column="1/3" htmlFor="file">
        Upload Image:
      </Label>
      <Input
        column="3/6"
        type="file"
        name="file"
        id="file"
        onChange={handleFileChange}
      />
      <Fieldset column="1/9">
        <Legend>Options</Legend>
        <Label htmlFor="isPublic">
          Event is Public:
          <Checkbox
            type="checkbox"
            name="isPublic"
            id="isPublic"
            object="options"
            checked={formData.options.isPublic}
            onChange={handleCheckboxChange}
          />
        </Label>
        <Label htmlFor="isRSVPRequired">
          RSVP is Required:
          <Checkbox
            type="checkbox"
            name="isRSVPRequired"
            id="isRSVPRequired"
            object="options"
            checked={formData.options.isRSVPRequired}
            onChange={handleCheckboxChange}
          />
        </Label>
        <Label htmlFor="isRSVPLimited">
          Set Maximum Attendies:
          <Checkbox
            type="checkbox"
            name="isRSVPLimited"
            id="isRSVPLimited"
            object="options"
            checked={formData.options.isRSVPLimited}
            onChange={handleCheckboxChange}
          />
        </Label>
        {formData.options.isRSVPLimited && (
          <>
            <Label htmlFor="RSVPLimit">
              Max Attendies:
              <Input
                required
                type="number"
                name="RSVPLimit"
                id="RSVPLimit"
                value={formData.RSVPLimit}
                onChange={handleChange}
              />
            </Label>
          </>
        )}
      </Fieldset>
      <Fieldset column="1/9">
        <Legend>Planning Methods</Legend>
        <Text>Allow:</Text>
        <Label htmlFor="allowGameSignups">
          Game Signups
          <Checkbox
            type="checkbox"
            name="allowGameSignups"
            id="allowGameSignups"
            object="options"
            checked={formData.options.allowGameSignups}
            onChange={handleCheckboxChange}
          />
        </Label>
        <Label htmlFor="allowGameVoting">Game Voting</Label>
        <Checkbox
          type="checkbox"
          name="allowGameVoting"
          id="allowGameVoting"
          object="options"
          checked={formData.options.allowGameVoting}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="allowGameScheduling">
          Game Scheduling
          <Checkbox
            type="checkbox"
            name="allowGameScheduling"
            id="allowGameScheduling"
            object="options"
            checked={formData.options.allowGameScheduling}
            onChange={handleCheckboxChange}
          />
        </Label>
      </Fieldset>
      <Button column="7/9" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default Create;
