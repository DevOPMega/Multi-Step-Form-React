import "./styles.css";
import { useState } from "react";

// step heading and instruction array
const stepInfo = [
  {
    heading: "Personal info",
    instruction: "Please provide your name, email address, and phone number"
  },
  {
    heading: "Select your plan",
    instruction: "You have the option of monthly or yearly biling"
  },
  {
    heading: "Pick add-ons",
    instruction: "Add-ons help enhance your gaming experience"
  },
  {
    heading: "Finishing up",
    instruction: "Double-check everything looks OK before confirming"
  },
  {}
];

// plan menu objects in array consist of icon image, plan name and plan price
const planMenu = [
  { imgName: "icon-arcade", planName: "Arcade", planPrice: 9 },
  { imgName: "icon-advanced", planName: "Advanced", planPrice: 12 },
  { imgName: "icon-pro", planName: "Pro", planPrice: 15 }
];

// Pick add-ons array list of object that consist of add-on plan and it's price
const addOns = [
  { service: "Online service", info: "Access to multiplayer games", price: 1 },
  { service: "Larger storage", info: "Extra 1TB of cloud save", price: 2 },
  {
    service: "Customizable Profile",
    info: "Custome theme on your profile",
    price: 2
  }
];

// Sidebar of the form
function Sidebar(props) {
  // Sidebar steps name array
  const steps = ["your info", "select plan", "add-ons", "summary"];

  return (
    // Sidebar element
    <div className="sidebar">
      {/* Iterating an array steps */}
      {steps.map((stepName, index) => (
        <div className="step">
          <div
            className="step-num"
            style={
              props.step === index
                ? { backgroundColor: "#A6D0DD", color: "#000" }
                : {}
            }
          >
            {index + 1}
          </div>
          <div className="step-info">
            <span>STEP {index + 1}</span>
            <span>{stepName.toUpperCase()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Step: I Personal information Component
function PersonalInfo(props) {
  return (
    <>
      <div className="personal-info-inputs">
        <div>
          <label>
            Name<span>{props.errorCode === 1 && "This field is required"}</span>
          </label>
          <input
            type="text"
            placeholder="e.g Adesh Singh"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
          />
        </div>
        <div>
          <label>
            Email Address
            <span>{props.errorCode === 2 && "This field is required"}</span>
          </label>
          <input
            type="email"
            placeholder="e.g adeshsingh@gmail.com"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>
            Phone Number
            <span>{props.errorCode === 3 && "This field is required"}</span>
          </label>
          <input
            type="number"
            placeholder="e.g 90000 50000"
            value={props.phone}
            onChange={(e) => props.setPhone(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

// Step: II Plan selection component
function Plans(props) {
  // State select plan (default: first plan)

  return (
    <div class="plans">
      <div class="plan-card-flex">
        {planMenu.map((plan, index) => (
          <div
            class="plan-card"
            style={props.selectPlan === index ? { borderColor: "#0b285f" } : {}}
            onClick={() => props.setSelectPlan(index)}
          >
            <div class="icon-img">
              <img src={`images/${plan.imgName}.svg`} alt="icon" />
            </div>
            <div class="plan-info">
              <h5>{plan.planName}</h5>
              <p>
                $
                {props.planTime === "Monthly"
                  ? plan.planPrice
                  : plan.planPrice * 10}
                /mo
              </p>
            </div>
          </div>
        ))}
      </div>
      <div class="plan-time">
        <p style={props.planTime === "Monthly" ? { color: "#000" } : {}}>
          Monthly
        </p>
        <div
          class="plan-select"
          onClick={() => {
            props.planTime === "Monthly"
              ? props.setPlanTime(() => {
                  props.setBallPos(25);
                  return "Yearly";
                })
              : props.setPlanTime(() => {
                  props.setBallPos(5);
                  return "Monthly";
                });
          }}
        >
          <div class="ball" style={{ left: `${props.ballPos}px` }}></div>
        </div>
        <p style={props.planTime === "Yearly" ? { color: "#000" } : {}}>
          Yearly
        </p>
      </div>
    </div>
  );
}

// Step III : Add-ons component
function AddOns(props) {
  return (
    <div className="add-ons">
      {addOns.map((add, index) => (
        <div
          class="add-item"
          onClick={() => {
            // setChecked(() => {
            props.setChecked(() => {
              let a = props.checked.slice();
              a[index] = !a[index];
              return a;
            });
            console.log(props.checked);
            // });
          }}
        >
          <div class="adds-item-input">
            <input type="checkbox" checked={props.checked[index]} />
          </div>
          <div className="adds-on-feature-info">
            <h4>{add.service}</h4>
            <p>{add.info}</p>
          </div>
          <div class="add-ons-price">
            <p>
              +$
              {props.planTime === "Monthly"
                ? add.price + "/mo"
                : add.price * 10 + "/yr"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// STEP IV : Summary of services provide and it's calculation
function Summary(props) {
  let total =
    props.planTime === "Monthly"
      ? planMenu[props.selectPlan].planPrice
      : planMenu[props.selectPlan].planPrice * 10;

  return (
    <div className="summary-flex">
      <div className="summary-plans">
        <div className="plan-name">
          <h4>
            {planMenu[props.selectPlan].planName}({props.planTime})
          </h4>
          <a href="#s">change</a>
        </div>
        <div className="plan-price">
          <h4>
            $
            {props.planTime === "Monthly"
              ? planMenu[props.selectPlan].planPrice + "/mo"
              : planMenu[props.selectPlan].planPrice * 10 + "/yr"}
          </h4>
        </div>
      </div>
      <div className="summary-add-ons">
        {props.checked.map((check, index) => {
          if (check) {
            if (props.planTime === "Monthly") {
              total += addOns[index].price;
            } else {
              total += addOns[index].price * 10;
            }
            return (
              <div className="service">
                <p>{addOns[index].service}</p>
                <p>
                  +$
                  {props.planTime === "Monthly"
                    ? addOns[index].price + "/mo"
                    : addOns[index].price * 10 + "/yr"}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="service total">
        <p>Total(per {props.planTime})</p>
        <p>
          ${total}/{props.planTime === "Monthly" ? "mo" : "yr"}
        </p>
      </div>
    </div>
  );
}

function Confirm() {
  return (
    <div className="confirm left-side">
      <div className="confirm-box">
        <div className="confirm-checkbox">
          <span class="material-symbols-outlined">new_releases</span>
        </div>
        <div className="confirm-thank">
          <h1>Thank You!</h1>
        </div>
        <div className="confirm-info">
          <p>
            Thanks for confirming your subscription! We hope you have fun using
            our platform, If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </p>
        </div>
      </div>
    </div>
  );
}

// Form structure
function FormStructure({ step, setStep }) {
  //Profile info states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(undefined);
  const [errorCode, setErrorCode] = useState(0);
  // Plans states
  const [selectPlan, setSelectPlan] = useState(0);
  const [planTime, setPlanTime] = useState("Monthly");
  const [ballPos, setBallPos] = useState(5);
  // Add-ons states
  const [checked, setChecked] = useState([false, false, false]);

  function checkNonEmpty() {
    if (name === "") {
      setErrorCode(1);
    } else if (email === "") {
      setErrorCode(2);
    } else if (phone === undefined) {
      setErrorCode(3);
    } else {
      return true;
    }
    return false;
  }

  return (
    <div className="form left-side">
      <div className="form-heading">
        <h1>{stepInfo[step].heading}</h1>
        <p>{stepInfo[step].instruction}</p>
      </div>
      <div class="step-form">
        {step === 0 ? (
          <PersonalInfo
            name={name}
            email={email}
            phone={phone}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            errorCode={errorCode}
          />
        ) : step === 1 ? (
          <Plans
            selectPlan={selectPlan}
            setSelectPlan={setSelectPlan}
            planTime={planTime}
            setPlanTime={setPlanTime}
            ballPos={ballPos}
            setBallPos={setBallPos}
          />
        ) : step === 2 ? (
          <AddOns
            checked={checked}
            setChecked={setChecked}
            planTime={planTime}
          />
        ) : (
          <Summary
            selectPlan={selectPlan}
            planTime={planTime}
            checked={checked}
          />
        )}
      </div>
      <div className="btn">
        {step > 0 && (
          <button
            class="prev-btn"
            onClick={() => {
              if (step > 0 && step <= 3) {
                setStep(step - 1);
              }
            }}
          >
            Go back
          </button>
        )}
        <button
          className="next-btn"
          onClick={() => {
            const check = checkNonEmpty();
            if (check && step >= 0 && step <= 3) {
              setStep(step + 1);
            }
          }}
        >
          {step !== 3 ? "Next Step" : "Confirm"}
        </button>
      </div>
    </div>
  );
}

// Export App Component to index.js
export default function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="multi-step-form">
      <Sidebar step={step} />
      {step >= 0 && step <= 3 ? (
        <FormStructure step={step} setStep={setStep} />
      ) : (
        <Confirm />
      )}
    </div>
  );
}
