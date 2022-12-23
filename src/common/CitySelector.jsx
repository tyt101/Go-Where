import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./CitySelector.css";

const CityItem = memo(function CityItem(props) {
  const { name, onSelected } = props;
  return (
    <li className="city-li" onClick={() => onSelected(name)}>
      {name}
    </li>
  );
});
CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};
const CitySection = memo(function CitySection(props) {
  const { cities = [], title, onSelected } = props;
  return (
    <ul className="city-ul" data-cate={title}>
      <li className="city-li" key={title}>
        {title}
      </li>
      {cities.map((city) => {
        return (
          <CityItem name={city.name} key={city.name} onSelected={onSelected} />
        );
      })}
    </ul>
  );
});
CitySection.propTypes = {
  cities: PropTypes.array,
  title: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};
const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});
const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});
AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
const CityList = memo(function CityList(props) {
  const { sections, onSelected, toAlpha } = props;
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map((section) => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelected={onSelected}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map((alpha) => {
          return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />;
        })}
      </div>
    </div>
  );
});
const SuggestItem = memo(function SuggestItem(props) {
  const { name, onSelected } = props;

  return (
    <li className="city-suggest-li" onClick={() => onSelected(name)}>
      {name}
    </li>
  );
});
SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};
const Suggest = memo(function Suggest(props) {
  const { searchKey, onSelected } = props;

  const [result, setResult] = useState([]);
  // 发送请求：副作用
  useEffect(() => {
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then((res) => res.json())
      .then((resultData) => {
        setResult(resultData.result);
      });
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          key: searchKey,
          display: searchKey,
        },
      ];
    }
    return result;
  }, [result, searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map((result) => {
          return (
            <SuggestItem
              key={result.key}
              name={result.display}
              onSelected={onSelected}
            />
          );
        })}
      </ul>
    </div>
  );
});
Suggest.propTypes = {
  searchKey: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
};
CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
};

const CitySelector = memo(function CitySelector(props) {
  const [searchKey, setSearchKey] = useState("");
  const key = useMemo(() => searchKey.trim(), [searchKey]);
  const { show, cityData, isLoading, onBack, onSelected, fetchCityData } =
    props;

  // 副作用
  useEffect(() => {
    if (!show || cityData || isLoading) return;

    fetchCityData();
  }, [show, cityData, isLoading, fetchCityData]);

  const toAlpha = useCallback((alpha) => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView(true);
  }, []);
  const OutputCitySelector = () => {
    if (isLoading) return <Fragment>Loading...</Fragment>;

    if (cityData) {
      return (
        <Fragment>
          <CityList
            sections={cityData.cityList}
            onSelected={onSelected}
            toAlpha={toAlpha}
          />
        </Fragment>
      );
    }
    return <div>error...</div>;
  };

  return (
    <div className={classNames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => setSearchKey("")}
          className={classNames("search-clean", {
            hidden: key.length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest searchKey={searchKey} onSelected={onSelected} />
      )}
      {OutputCitySelector()}
    </div>
  );
});
CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
};
export default CitySelector;
