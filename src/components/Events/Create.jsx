import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../../Utilities/colors";
import { Link } from "react-router-dom";
import ToolTip from "../../elements/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from "../../context/FirebaseContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import { UtilityContext } from "../../context/UtilityContext";
import {
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
const Create = (props) => {
  const { setstate } = props;
  const { createEvent } = useContext(FirebaseContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: null,
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
      isVirtual: false,
      isRecurring: false,
      isRSVPRequired: false,
      isRSVPLimited: false,
      allowGameSignups: false,
      allowGameVoting: false,
      allowGameScheduling: false,
    },
    attendees: [],
    games: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateObject = convertDateStringToObject(formData.date);
    const eventData = { ...formData, dateObject: dateObject };
    createEvent(eventData).then((res) => {
      console.log(res);
      setFormData({
        name: "",
        description: "",
        date: null,
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
          isVirtual: false,
          isRecurring: false,
          isRSVPRequired: false,
          isRSVPLimited: false,
          allowGameSignups: false,
          allowGameVoting: false,
          allowGameScheduling: false,
        },
        attendees: [],
        games: [],
      });
      setstate("Manage");
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
      <Input
        column="3/9"
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <Label column="1/3" htmlFor="startTime">
        Start Time
      </Label>
      <Input
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
        column="7/9"
        type="text"
        name="zip"
        id="zip"
        placeholder="Zip"
        value={formData.zip}
        onChange={handleChange}
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
