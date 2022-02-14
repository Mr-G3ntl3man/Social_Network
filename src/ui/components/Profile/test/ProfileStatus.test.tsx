import React from "react";
import {render} from "react-dom";
import {act} from "react-dom/test-utils";
import {ProfileStatus} from "../ProfileInfo/ProfileStatus";
import {updateStatus} from "../../../../bll/reducer/profile-reducer";
import {cleanup} from "@testing-library/react";

let container: any = undefined;

beforeEach(() => {
   // подготавливаем DOM-элемент, куда будем рендерить
   container = document.createElement("div");
   document.body.appendChild(container);
});

afterEach(cleanup);


describe('Test ProfileStatus Component', () => {

   it('"renders with or without a status"', () => {
      act(() => render(<ProfileStatus status={'new status'} updateStatus={updateStatus}/>, container))

      expect(container.textContent).toBe("Status:  new status")

   })


})